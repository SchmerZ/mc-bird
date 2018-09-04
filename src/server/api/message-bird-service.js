/**
 * Have tried 'messagebird' npm pkg before (https://www.npmjs.com/package/messagebird).
 * Due to limited functionality (i.e. no GET /api/messages, etc) implemented my own.
 */

import BaseService from '../lib/base-service'

import statusFilters from '../../shared/constants/status-filters'
import direction from '../../shared/constants/message-directions'

const statusToQueryMap = {
  [statusFilters.all]: '',
  [statusFilters.received]: `&direction=${direction.received}`,
  [statusFilters.sent]: `&direction=${direction.sent}`,
};

class MessageBirdService extends BaseService {
  constructor(config) {
    if (!config.AccessKey)
      throw new Error('AccessKey has no value. Incorrect parameter value.');

    if (!config.urls || !config.urls.MessageBirdApiRoot)
      throw new Error('MessageBirdApiRoot has no value. Check configuration.');

    const headers = {
      'Authorization': 'AccessKey ' + config.AccessKey,
      'User-Agent': 'MessageBird/CustomApiClient/v0.0.1 Node.js/' + process.versions.node,
    };

    super(headers);

    this.rootUrl = config.urls.MessageBirdApiRoot;
  }

  handleError = async (error) => {
    const data = await error.response.json();

    if (data.errors) {
      const clientErrors = data.errors.map(err => {
        return err.description + ' (code: ' + err.code + (err.parameter ? ', parameter: ' + err.parameter : '') + ')';
      });

      const nextError = new Error('api error(s): ' + clientErrors.join(', '));
      nextError.status = error.response.status;
      nextError.errors = data.errors;

      throw nextError;
    }
    else {
      throw error;
    }
  };

  getUrl(path) {
    return `${this.rootUrl}${path}`
  }

  async getMessages({offset, status, limit}) {
    const statusFilterQuery = statusToQueryMap[status] || '';

    const url = this.getUrl(`/messages?offset=${offset}&limit=${limit}${statusFilterQuery}`);

    return this.get(url).catch(this.handleError);
  }

  async sendMessage(data) {
    const url = this.getUrl('/messages');

    return this.post(url, data).catch(this.handleError);
  }

  async getContacts({offset, limit}) {
    const url = this.getUrl(`/contacts?offset=${offset}&limit=${limit}`);

    return this.get(url).catch(this.handleError);
  }

  async getContactByMsisdn(msisdn) {
    const url = this.getUrl(`/contacts?msisdn=${msisdn}`);

    return this.get(url).catch(this.handleError);
  }


  async getContactMessages({contactId, offset = 0, limit = 200}) {
    const url = this.getUrl(`/contacts/${contactId}/messages?offset=${offset}&limit=${limit}`);

    return this.get(url).catch(this.handleError);
  }
}

export default MessageBirdService;
