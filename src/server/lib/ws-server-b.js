import {server as WebSocketServer} from "websocket"

export default (server) => {
  const wsServer = new WebSocketServer({
    httpServer: server
  });

  wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        // process WebSocket message
      }
    });

    connection.on('close', function (connection) {
      // close user connection
    });
  });
}
