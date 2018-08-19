import express from 'express'

import routerActionCreator from '../../lib/router-action-creator'
import Controller from './messages-controller'

export default (config) => {
  const router = express.Router();

  router.get('/', routerActionCreator(Controller, Controller.prototype.getMessages, config));
  router.post('/', routerActionCreator(Controller, Controller.prototype.sendMessage, config));

  return router;
}
