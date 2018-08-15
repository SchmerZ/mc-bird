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

    return await wrap(this.service.create)(params)
      .then(response => {
        this.response.send(200);
      })
      .catch(error => {
        debugger
        console.log(error);
      });
  }
}
