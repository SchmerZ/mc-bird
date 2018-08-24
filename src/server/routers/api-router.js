import express from 'express';
import bodyParser from 'body-parser';

import routers from '../api';

const apiRouter = express.Router();

export default (wsServer) => {
  // Body Parser
  apiRouter.use(bodyParser.json());

  // Bind all Controllers
  routers(apiRouter, wsServer);

  return apiRouter;
}
