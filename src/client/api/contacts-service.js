import ajax from './ajax';

export default {
  fetchContacts({offset, limit}) {
    const url = `/api/contacts?offset=${offset}&limit=${limit}`;

    return ajax.get(url);
  },

  fetchContactMessages({msisdn}) {
    const url = `/api/contacts/${msisdn}/messages`;

    return ajax.get(url);
  }
}
