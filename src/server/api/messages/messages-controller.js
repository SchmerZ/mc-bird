import BaseController from '../../lib/base-controller'
import Service from '../message-bird-service'

export default class MessagesController extends BaseController {
  constructor(request, response, next, config) {
    super(request, response, next, config);

    this.service = new Service(config.AccessKey);
  }

  async getMessages() {
    return await this.service.getMessages();
  }

  async sendMessage() {
    const {recipient, messageText} = this.request.body;

    const params = {
      originator: this.config.Originator,
      recipients: [recipient],
      body: messageText,
    };

    return await this.service.sendMessage(params);
  }
}