import BaseController from '../../lib/base-controller'
import Service from '../message-bird-service'

export default class ContactsController extends BaseController {
  constructor(request, response, next, config) {
    super(request, response, next, config);

    this.service = new Service(config);
  }

  async getContacts() {
    const {limit, offset} = this.request.query;

    return await this.service.getContacts({limit, offset});
  }
}
