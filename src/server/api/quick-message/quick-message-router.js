import express from 'express'
import * as routes from '../../routes/routeTemplates'

import routerActionCreator from '../../lib/router-action-creator'
import Controller from './quick-message-controller'

export default (config) => {
  const router = express.Router();

  router.post(routes.messages, routerActionCreator(Controller, Controller.prototype.sendMessage, config));

  return router;
}
