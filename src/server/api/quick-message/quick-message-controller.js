import messageBird from 'messagebird'
import BaseController from '../../lib/base-controller'

const wrap = (fn) => (params) => {
  return new Promise((resolve, reject) => {
    fn(params, (err, response) => {
      if (err) {
        const {errors, statusCode, message} = err;
        reject({errors, statusCode, message});
      }
      else {
        resolve(response);
      }
    })
  });
};

export default class QuickMessageController extends BaseController {
  constructor(request, response, next, config) {
    super(request, response, next, config);

    this.service = messageBird(config.AccessKey).messages;
  }

  async sendMessage() {
    const {recipient, messageText} = this.request.body;

    const params = {
      originator: this.config.Originator,
      recipients: [recipient],
      body: messageText,
    };

    return await wrap(this.service.create)(params);
  }
}
