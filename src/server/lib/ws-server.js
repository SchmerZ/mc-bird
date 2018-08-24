import {server as WebSocketServer} from 'websocket'
import chalk from 'chalk'

const log = (message) => console.log(chalk.yellowBright(message));

class WsServer {
  constructor(server) {
    this.server = server;
    this.connections = [];

    return this;
  }

  start() {
    this.wsServer = new WebSocketServer({
      httpServer: this.server,
    });

    this.wsServer.on("request", (request) => this.handleRegistrationRequest(request));

    log('WebSocket has been started.');

    return this;
  }

  push(data) {
    this.connections.forEach(destination => {
      const json = JSON.stringify(data);

      log(`${destination.remoteAddress} WebSocket rebroadcast data.`);
      destination.send(json);
    });

    return this;
  }

  handleRegistrationRequest(request) {
    const connection = request.accept(null, request.origin);
    this.connections.push(connection);

    log(connection.remoteAddress + " connected - Protocol Version " + connection.webSocketVersion);

    // Handle closed connections
    connection.on('close', () => {
      log(connection.remoteAddress + " disconnected");

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
