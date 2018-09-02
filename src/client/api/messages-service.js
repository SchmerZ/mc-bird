import ajax from './ajax';

export default {
  sendMessage({recipient, messageText}) {
    const url = `/api/messages`;

    return ajax.post(url, {recipient, messageText});
  },

  fetchMessages({offset, status, limit}) {
    const url = `/api/messages?offset=${offset}&status=${status}&limit=${limit}`;

    return ajax.get(url);
  },
}
