import express from 'express'
import path from 'path';

import ssrRouter from './ssr-view-router'
import apiRouter from './api-router'

import errorHandler from '../lib/error-handler'

const appRouter = express.Router();

export default () => {
  appRouter.use(express.static(path.join(__dirname, '../../client/static')));
  appRouter.use('/api', apiRouter());
  appRouter.get('/', ssrRouter());

  appRouter.use(errorHandler());

  return appRouter;
}