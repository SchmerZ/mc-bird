import BaseController from '../../lib/base-controller'
import Service from '../message-bird-service'

import toModel from '../converters/message-converter'

export default class ContactsController extends BaseController {
  constructor(request, response, next, config) {
    super(request, response, next, config);

    this.service = new Service(config);
  }

  async getContacts() {
    const {limit, offset} = this.request.query;

    return await this.service.getContacts({limit, offset});
  }

  async getContactMessages() {
    const {msisdn} = this.request.params;

    const {count, items} = await this.service.getContactByMsisdn(msisdn);
    if (count === 0)
      throw {message: `Unable to find contact by ${msisdn}.`, statusCode: 400};

    const contact = items[0];
    const {id: contactId, messages: {totalCount}} = contact;

    if (totalCount === 0) return {totalCount, items: []};

    const batchSize = 200;
    const promises = new Array(Math.ceil(totalCount / batchSize))
      .fill(0)
      .map((x, index) => index * batchSize)
      .map(x => this.service.getContactMessages({contactId, offset: x, limit: batchSize}));

    const responses = await Promise.all(promises);

    const data = responses.reduce((memo, curr) => {
      const items = curr.items.map(toModel);

      return {
        ...memo,
        items: [...memo.items, ...items]
      }
    }, {contact, totalCount, items: []});

    return data;
  }
}
