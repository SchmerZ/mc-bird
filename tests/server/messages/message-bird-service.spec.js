import Service from '../../../src/server/api/message-bird-service'

const defaultConfig = {
  AccessKey: 'some-value',
  urls: {
    messageBirdApiRoot: 'http://rest.messagebird.com/api'
  }
};

describe('MessageBird service', () => {
  it('should rise an error if config has no AccessKey', () => {
    expect(() => new Service({}))
      .toThrow('AccessKey has no value. Incorrect parameter value.');
  });

  it('should rise an error if config has no messageBirdApiRoot', () => {
    expect(() => new Service({AccessKey: 'some-value'}))
      .toThrow('messageBirdApiRoot has no value. Check configuration.');
  });

  it('should have rootUrl from config value', () => {
    const service = new Service(defaultConfig);

    expect(service.rootUrl).toEqual(defaultConfig.urls.messageBirdApiRoot);
  });

  it('should have AccessKey header', () => {
    const service = new Service(defaultConfig);
    expect(service.headers.Authorization).toEqual(`AccessKey ${defaultConfig.AccessKey}`);
  });

  it('should rethrow error on handle error if response has no errors array in body', async () => {
    const service = new Service(defaultConfig);
    const errorResponse = {
      response: {
        json: jest.fn().mockResolvedValueOnce({name: 'value'}),
      }
    };

    try {
      await service.handleError(errorResponse);
    }
    catch (err) {
      expect(err).toEqual(errorResponse);
    }
  });

  it('should handle error if response has errors array in body', async () => {
    const service = new Service(defaultConfig);
    const errorResponse = {
      response: {
        status: 422,
        json: jest.fn().mockResolvedValueOnce({
          errors: [
            {description: 'first error', code: 1},
            {description: 'second error', code: 2, parameter: '@p1'}
          ]
        }),
      }
    };

    try {
      await service.handleError(errorResponse);
    }
    catch (err) {
      expect(err.status).toEqual(422);
      expect(err).toMatchSnapshot();
    }
  });
});
