import config from '../config';

import messagesRouter from './messages/messages-router'
import contactsRouter from './contacts/contacts-router'
import callbackRouter from './callback/callback-router'

export default (apiRouter, wsServer) => {
  apiRouter.use('/messages', messagesRouter({config, wsServer}));
  apiRouter.use('/contacts', contactsRouter({config, wsServer}));
  apiRouter.use('/callback', callbackRouter(wsServer));
};
