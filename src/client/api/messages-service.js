import ajax from './ajax';
import * as routes from '../../server/routes/routeTemplates'

export default {
  sendMessage({recipient, messageText}) {
    const url = `/api${routes.messages}`;

    return ajax.post(url, {recipient, messageText});
  },
}
