import {server as WebSocketServer} from 'websocket'
import chalk from 'chalk'

const log = (message) => console.log(chalk.greenBright(message));

class WsServer {
  constructor(app) {
    this.app = app;
    this.connections = [];

    return this;
  }

  start() {
    this.wsServer = new WebSocketServer({
      httpServer: this.app,
    });

    this.wsServer.on("request", this.handleRegistrationRequest);

    log('WebSocket has been started.');

    return this;
  }

  push(data) {
    log('WebSocket rebroadcast data.');

    // rebroadcast command to all clients
    this.connections.forEach(destination => {
      destination.sendUTF(message.utf8Data);
    });

    return this;
  }

  handleRegistrationRequest(request) {
    const connection = request.accept('whiteboard-example', request.origin);
    this.connections.push(connection);

    console.log(connection.remoteAddress + " connected - Protocol Version " + connection.webSocketVersion);

    // Handle closed connections
    connection.on('close', () => {
      console.log(connection.remoteAddress + " disconnected");

      const index = this.connections.indexOf(connection);
      if (index !== -1) {
        // remove the connection from the pool
        this.connections.splice(index, 1);
      }
    });

    // Handle incoming messages
    connection.on('message', (message) => {
      // if (message.type === 'utf8') {
      //   try {
      //     var command = JSON.parse(message.utf8Data);
      //
      //     if (command.msg === 'clear') {
      //       canvasCommands = [];
      //     }
      //     else {
      //       canvasCommands.push(command);
      //     }
      //
      //     // rebroadcast command to all clients
      //     connections.forEach(function (destination) {
      //       destination.sendUTF(message.utf8Data);
      //     });
      //   }
      //   catch (e) {
      //     // do nothing if there's an error.
      //   }
      // }
    });
  }
}

export default WsServer
