import express from 'express'
import path from 'path';

import ssrRouter from './ssr-view-router'
import apiRouter from './api-router'

import errorHandler from '../lib/error-handler'
import requestLogger from '../lib/request-logger'

import PageLoading from '../../client/components/pages/page-loading'

export default (wsServer) => {
  const appRouter = express.Router();

  appRouter.use(express.static(path.join(__dirname, '../../client/static')));

  appRouter.use(requestLogger());
  appRouter.use('/api', apiRouter(wsServer));

  appRouter.get('*', ssrRouter(PageLoading));

  appRouter.use(errorHandler());

  return appRouter;
}
