import BaseController from '../../lib/base-controller'
import Service from '../message-bird-service'

const toModel = (apiResponseMessage) => ({
  id: apiResponseMessage.id,
  body: apiResponseMessage.body,
  direction: apiResponseMessage.direction,
  originator: apiResponseMessage.originator,
  createdDatetime: apiResponseMessage.createdDatetime,
  recipient: apiResponseMessage.recipients.items[0].recipient,
  status: apiResponseMessage.recipients.items[0].status,
});

export default class MessagesController extends BaseController {
  constructor(request, response, next, config, wsServer) {
    super(request, response, next, config);

    this.service = new Service(config);
    this.wsServer = wsServer;
  }

  async getMessages() {
    const {limit, offset} = this.request.query;

    const response = await this.service.getMessages({limit, offset});
    const items = response.items.reduce((memo, curr) => [...memo, toModel(curr)], []);

    return {
      ...response,
      items,
    }
  }

  async sendMessage() {
    const {recipient, messageText} = this.request.body;

    const params = {
      originator: this.config.Originator,
      recipients: [recipient],
      body: messageText,
    };

    const sentMessage = await this.service.sendMessage(params);
    const model = toModel(sentMessage);

    this.wsServer.push(model, true);

    return model;
  }
}
