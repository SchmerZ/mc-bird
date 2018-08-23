import ajax from './ajax';
import * as routes from '../../server/routes/routeTemplates'

export default {
  sendMessage({recipient, messageText}) {
    const url = `/api${routes.messages}`;

    return ajax.post(url, {recipient, messageText});
  },

  fetchMessages({offset, limit}) {
    const url = `/api${routes.messages}?offset=${offset}&limit=${limit}`;

    return ajax.get(url);
  }
}
