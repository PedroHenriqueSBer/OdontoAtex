using Backend.Domain.interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;

namespace Backend.Api.Managers
{
    public class SocketManager : ISocketManager
    {
        private static ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();
        private static ConcurrentDictionary<string, HashSet<string>> _subscriptions = new ConcurrentDictionary<string, HashSet<string>>();
        public ConcurrentDictionary<string, WebSocket> GetAll() => _sockets;

        public WebSocket GetSocketById(string id) => _sockets.FirstOrDefault(p => p.Key == id).Value;
        public string GetId(WebSocket socket) => _sockets.FirstOrDefault(p => p.Value == socket).Key;
        private string CreateConnectionId() => Guid.NewGuid().ToString();
        public string AddSocket(WebSocket socket, string path)
        {
            var id = CreateConnectionId();
            _sockets.TryAdd(id, socket);

            try
            {
                HashSet<string> subs = new HashSet<string>();
                subs.Add(id);
                _subscriptions.AddOrUpdate(path, subs, (key, oldValue) =>
                {
                    if (oldValue == null) oldValue = new HashSet<string>();
                    oldValue.Add(id);
                    return oldValue;
                });
            }
            catch { }

            return id;
        }
        public async Task RemoveSocket(string id)
        {
            WebSocket socket;
            _sockets.TryRemove(id, out socket);

            try
            {


                _subscriptions.Where(s => s.Value.Contains(id)).ToList()
                    .ForEach(s => s.Value.Remove(id));

                _subscriptions.Where(s => s.Value.Count <= 0).ToList()
                    .ForEach(s => _subscriptions.TryRemove(s.Key, out _));

            }
            catch { }
            await socket.CloseAsync(closeStatus: WebSocketCloseStatus.NormalClosure,
                                    statusDescription: "Closed by the WebSocketManager",
                                    cancellationToken: CancellationToken.None);
        }

        public async Task SendMessageToAllAsync(object message)
        {
            foreach (var pair in _sockets)
            {
                if (pair.Value.State == WebSocketState.Open)
                    await SendMessageAsync(pair.Value, message);
            }
        }
        public async Task SendMessageToSubsAsync(string path, object? message)
        {
            try
            {
                HashSet<string> socketsIds;
                _subscriptions.TryGetValue(path, out socketsIds);

                if (socketsIds == null) return;
                var sockets = _sockets.Where(s => socketsIds.Contains(s.Key));

                if (sockets == null) return;

                foreach (var pair in sockets)
                {
                    if (pair.Value.State == WebSocketState.Open)
                        await SendMessageAsync(pair.Value, message);
                }
            }
            catch { }
        }
        public async Task SendMessageAsync(WebSocket socket, object? message)
        {
            JsonSerializerSettings serializerSettings = new();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            var json = JsonConvert.SerializeObject(message, serializerSettings);

            if (socket.State != WebSocketState.Open) return;
            await socket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.UTF8.GetBytes(json),
                                                                  offset: 0,
                                                                  count: Encoding.UTF8.GetBytes(json).Length),
                                   messageType: WebSocketMessageType.Text,
                                   endOfMessage: true,
                                   cancellationToken: CancellationToken.None);
        }
    }
}