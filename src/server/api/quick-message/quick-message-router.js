import express from 'express'
import * as routes from '../../routes/routeTemplates'

import Controller from './quick-message-controller'

export default (config) => {
  const router = express.Router();

  router.post(routes.messages, (req, res) => {
    new Controller(req, res, config).sendMessage();
  });

  return router;
}