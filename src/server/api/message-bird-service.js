/**
 * Have tried 'messagebird' npm pkg before (https://www.npmjs.com/package/messagebird).
 * Due to limited functionality (i.e. no GET /api/messages, etc) implemented my own.
 */

import BaseService from '../lib/base-service'

class MessageBirdService extends BaseService {
  constructor(accessKey) {
    if (!accessKey)
      throw new Error('AccessKey has no value. Incorrect parameter value.');

    const headers = {
      'Authorization': 'AccessKey ' + accessKey,
      'User-Agent': 'MessageBird/CustomApiClient/v0.0.1 Node.js/' + process.versions.node,
    };

    super(headers);
  }

  handleError = async (error) => {
    const data = await error.response.json();

    if (data.errors) {
      const clientErrors = data.errors.map(err => {
        return err.description + ' (code: ' + err.code + (err.parameter ? ', parameter: ' + err.parameter : '') + ')';
      });

      const nextError = new Error('api error(s): ' + clientErrors.join(', '));
      nextError.statusCode = error.response.statusCode;
      nextError.errors = data.errors;

      throw nextError;
    }
    else {
      throw error;
    }
  };

  getUrl(path) {
    return `https://rest.messagebird.com${path}`
  }

  async getMessages({offset, limit}) {
    const url = this.getUrl(`/messages?offset=${offset}&limit=${limit}`);

    return this.get(url).catch(this.handleError);
  }

  async sendMessage(data) {
    const url = this.getUrl('/messages');

    return this.post(url, data).catch(this.handleError);
  }
}

export default MessageBirdService;
