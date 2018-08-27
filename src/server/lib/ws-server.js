import {server as WebSocketServer} from 'websocket'
import uuidv4 from 'uuid/v4'
import chalk from 'chalk'

const clientWsKeyHeaderName = 'x-client-ws-key';
const log = (message) => console.log(chalk.yellowBright(message));

class WsServer {
  constructor(server) {
    this.server = server;
    this.request = null;

    return this;
  }

  middleware = () => (req, resp, next) => {
    this.request = req;
    next();
  };

  start() {
    this.wsServer = new WebSocketServer({
      httpServer: this.server,
    });

    this.wsServer.on('request', (request) => this.handleRegistrationRequest(request));

    log('WebSocket has been started.');

    return this;
  }

  push(data, ignoreSender = false) {
    let connections = this.wsServer.connections;

    if (ignoreSender) {
      const clientWsKey = this.request.headers[clientWsKeyHeaderName];
      connections = connections.filter(x => x.clientWsKey !== clientWsKey);
    }

    connections.forEach(destination => {
      log(`${destination.remoteAddress} WebSocket rebroadcast data.`);

      destination.send(JSON.stringify(data));
    });

    return this;
  }

  handleRegistrationRequest(request) {
    const clientWsKey = uuidv4();
    const connection = request.accept(null, request.origin);
    connection.clientWsKey = clientWsKey;

    log(connection.remoteAddress + " connected - Protocol Version " + connection.webSocketVersion);
    connection.send(JSON.stringify({type: 'accept', name: clientWsKeyHeaderName, value: clientWsKey}));

    // Handle closed connections
    connection.on('close', () => {
      log(connection.remoteAddress + " disconnected");

      // const index = this.connections.indexOf(connection);
      // if (index !== -1) {
      //   // remove the connection from the pool
      //   this.connections.splice(index, 1);
      // }
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
