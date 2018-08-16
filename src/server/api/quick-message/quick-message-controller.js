import messageBird from 'messagebird'

const wrap = (fn) => (params) => {
  return new Promise((resolve, reject) => {
    fn(params, (err, response) => {
      if (err)
        reject(err);
      else
        resolve(response);
    })
  });
};

export default class QuickMessageController {
  constructor(request, response, config) {
    this.request = request;
    this.response = response;
    this.config = config;

    this.service = messageBird(config.AccessKey).messages;
  }

  async sendMessage() {
    const {recipient, messageText} = this.request.body;

    const params = {
      originator: this.config.Originator,
      recipients: [recipient],
      body: messageText,
    };

    try {
      const createdMessage = await wrap(this.service.create)(params);
      this.response.sendStatus(200);
    }
    catch (error) {
      const {errors} = error;
      const errorsHash = errors.reduce((memo, cur) => ({
        ...memo,
        [cur.parameter]: cur.description
      }), {});

      this.response.status(400).json(errorsHash);
    }
    // .then(response => {
    //     this.response.send(200);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     debugger
    //   });
  }
}
