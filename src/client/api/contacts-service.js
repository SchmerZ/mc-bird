import ajax from './ajax';

export default {
  fetchContacts({offset, limit}) {
    const url = `/api/contacts?offset=${offset}&limit=${limit}`;

    return ajax.get(url);
  }
}
