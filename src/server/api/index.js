import config from '../config';

import quickMessageRouter from './quick-message/quick-message-router'

export default apiRouter => {
  apiRouter.use(quickMessageRouter(config));
};