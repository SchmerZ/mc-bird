import express from 'express'
import path from 'path'
import http from 'http'

import config from './config'
import WsServer from './lib/ws-server'

import appRouter from './routers/app-router';

console.log(`Configuration (${config.Environment}) loaded:`);
console.log(config);

const app = express();
const server = http.createServer(app);
const wsServer = new WsServer(server).start();

app.use(express.static(path.join(__dirname, '../dist/public')));
app.use(config.siteRoot, appRouter(wsServer));

server.listen(config.port, () => {
  console.log(`Server started on port ${config.port} with environment ${config.Environment}.`);
});
