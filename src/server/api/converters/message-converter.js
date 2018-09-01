export default (apiResponseMessage) => ({
  id: apiResponseMessage.id,
  body: apiResponseMessage.body,
  direction: apiResponseMessage.direction,
  originator: apiResponseMessage.originator,
  createdDatetime: apiResponseMessage.createdDatetime,
  recipient: apiResponseMessage.recipients.items[0].recipient,
  status: apiResponseMessage.recipients.items[0].status,
});
