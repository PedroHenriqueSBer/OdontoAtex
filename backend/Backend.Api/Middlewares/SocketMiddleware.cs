using Backend.Domain.interfaces;
using System.Net.WebSockets;
using System.Text;

namespace Backend.Api.Middlewares
{
    public class SocketMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ISocketManager _socketManager;

        public SocketMiddleware(RequestDelegate next, ISocketManager socketManager)
        {
            _next = next;
            _socketManager = socketManager;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
                await _next.Invoke(context);
                return;
            }

            var path = context.Request.Path.Value;
            if (path.ToLower().Contains("undefined") || path.ToLower().Contains("null"))
                return;

            var socket = await context.WebSockets.AcceptWebSocketAsync();
            var id = _socketManager.AddSocket(socket, path);

            await Receive(socket, async (result, buffer) =>
            {
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await _socketManager.RemoveSocket(id);
                    return;
                }
                else if (result.MessageType == WebSocketMessageType.Text)
                {
                    await _socketManager.SendMessageAsync(socket, "Mensagem recebida: " + Encoding.UTF8.GetString(buffer, 0, result.Count));
                }
            });
        }

        private async Task Receive(WebSocket socket, Action<WebSocketReceiveResult, byte[]> handleMessage)
        {
            var buffer = new byte[1024 * 4];
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(buffer: new ArraySegment<byte>(buffer),
                                                       cancellationToken: CancellationToken.None);
                handleMessage(result, buffer);
            }
        }
    }

}
