import express from 'express'
import path from 'path';

import ssrRouter from './ssr-view-router'
import apiRouter from './api-router'

import errorHandler from '../lib/error-handler'

import PageLoading from '../../client/components/pages/page-loading'
import PageNotFound from '../../client/components/pages/page-not-found'

export default () => {
  const appRouter = express.Router();

  appRouter.use(express.static(path.join(__dirname, '../../client/static')));
  appRouter.use('/api', apiRouter());

  appRouter.get('/page-not-found', ssrRouter(PageNotFound, true));
  appRouter.get('*', ssrRouter(PageLoading));

  appRouter.use(errorHandler());

  return appRouter;
}
