import config from '../config';

import messagesRouter from './messages/messages-router'

export default apiRouter => {
  apiRouter.use('/messages', messagesRouter(config));
};
