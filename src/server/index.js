import express from 'express'
import http from 'http'
import path from 'path'

import appRouter from './routers/app-router';
//import wsServer from './lib/ws-server'

import config from './config'

console.log(`Configuration (${config.Environment}) loaded:`);
console.log(config);

const app = express();
const server = http.createServer(app);

//wsServer(server);

app.use(express.static(path.join(__dirname, '../dist/public')));
app.use(config.siteRoot, appRouter(app));

server.listen(config.port, () => {
  console.log(`Server started on port ${config.port} with environment ${config.Environment}.`);
});