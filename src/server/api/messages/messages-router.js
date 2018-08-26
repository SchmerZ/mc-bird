import express from 'express'

import routerActionExecutor from '../../lib/router-action-executor'
import Controller from './messages-controller'

export default ({config, wsServer}) => {
  const router = express.Router();

  router.get('/', (req, resp, next) => {
    const controller = new Controller(req, resp, next, config, wsServer);
    routerActionExecutor(controller, controller.getMessages);
  });

  router.post('/', (req, resp, next) => {
    const controller = new Controller(req, resp, next, config, wsServer);
    routerActionExecutor(controller, controller.sendMessage);
  });

  return router;
}
