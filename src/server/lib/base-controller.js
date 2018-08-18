export default class BaseController {
  constructor(request, response, next, config) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.config = config;

    this._responseStatusCode = null;
    this._responseBody = null;
  }

  end(responseData, statusCode) {
    statusCode = statusCode || this._responseStatusCode || 200;
    responseData = responseData || this._responseBody || '';

    this.response.status(statusCode);
    if (typeof responseData === 'object') {
      this.response.json(responseData);
    }
    else {
      this.response.send(responseData);
    }
  }

  handleError(error, message) {
    this._responseStatusCode = error.statusCode;
    this._responseBody = message || error.message;
  }
}
