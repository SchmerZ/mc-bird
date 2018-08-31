/**
 * Have tried 'messagebird' npm pkg before (https://www.npmjs.com/package/messagebird).
 * Due to limited functionality (i.e. no GET /api/messages, etc) implemented my own.
 */

import BaseService from '../lib/base-service'

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

  async getMessages({offset, limit}) {
    const url = this.getUrl(`/messages?offset=${offset}&limit=${limit}`);

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
}

export default MessageBirdService;
