using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.interfaces 
{ 
    public interface ISocketManager
    {
        string GetId(WebSocket socket);
        WebSocket GetSocketById(string id);
        public Task RemoveSocket(string id);
        string AddSocket(WebSocket socket, string path);
        ConcurrentDictionary<string, WebSocket> GetAll();
        public Task SendMessageToAllAsync(object message);
        public Task SendMessageAsync(WebSocket socket, object? message);
        public Task SendMessageToSubsAsync(string path, object? message);
    }

}
