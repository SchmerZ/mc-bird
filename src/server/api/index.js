import config from '../config';

import messagesRouter from './messages/messages-router'
import callbackRouter from './callback/callback-router'

export default (apiRouter, wsServer) => {
  apiRouter.use('/messages', messagesRouter({config, wsServer}));
  apiRouter.use('/callback', callbackRouter(wsServer));
};
