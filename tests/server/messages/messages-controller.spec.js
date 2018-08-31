import Controller from '../../../src/server/api/messages/messages-controller'

const defaultConfig = {
  AccessKey: 'some-value',
  Originator: 'Inbox',
  urls: {
    MessageBirdApiRoot: 'http://rest.messagebird.com/api'
  }
};

const wsServer = {
  push: jest.fn(),
};

const defaultRequest = {body: {recipient: '79201010203', messageText: 'Hello!'}};

describe('Messages controller', () => {
  it('should send correct body on sendMessage call', async () => {
    let postData = null;
    const fn = jest.fn((args) => postData = args);

    const controller = new Controller(defaultRequest, null, null, defaultConfig, wsServer);
    controller.service.sendMessage = fn;

    await controller.sendMessage();

    expect(postData).toMatchSnapshot();
  });

  it('should push response message into WebSocket server', async () => {
    const responseData = {
      id: 'new-message-id',
      body: 'Hello back!',
    };

    let pushedMessage = null;
    wsServer.push = jest.fn(message => pushedMessage = message);

    const controller = new Controller(defaultRequest, null, null, defaultConfig, wsServer);
    controller.service.sendMessage = jest.fn().mockResolvedValueOnce(responseData);

    await controller.sendMessage();

    expect(pushedMessage).toEqual(responseData);
  });
});
