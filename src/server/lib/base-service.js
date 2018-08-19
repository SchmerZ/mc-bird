import fetch from 'isomorphic-fetch'

const handleStatus = (response) => {
  if (response.status >= 200 && response.status < 300)
    return response;

  const error = new Error(response.statusText);
  error.status = response.status;
  error.response = response;

  throw error;
};

const parseJSON = (response) => {
  if (response.status === 204 || response.headers.get('content-length') === '0')
    return undefined;

  return response.json();
};

const logCallToConsole = (url, method) => (response) => {
  const statusCode = response && response.status ? parseInt(response.status, 10) : 500;

  console.log(`${method} ${url} ended with ${statusCode} status code.`);

  return response;
};

const logCallErrorToConsole = (url, error, method) => {
  const message = `${error.status || ''} ${error.statusText || ''}`;

  console.log(message);
  console.log(error);
};

class BaseService {
  constructor(headers) {
    this.headers = headers;
  }

  request(url, method, headers, data) {
    const fetchOptions = {
      method: method,
      body: data,
      headers: {
        ...this.headers,
        ...headers,
      }
    };

    return fetch(url, fetchOptions)
      .then(logCallToConsole(url, method))
      .then(handleStatus)
      .catch(error => {
        logCallErrorToConsole(url, error, method);

        throw error;
      })

    // if (options.method === 'POST' || options.method === 'PUT') {
    //   body = JSON.stringify(params);
    //   options.headers['Content-Type'] = 'application/json';
    //   options.headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
    // } else {
    //   options.path += params ? '?' + querystring.stringify(params) : '';
    // }
    //
    // request = http.request(options);
  }

  json(path, method, data) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    return this.request(path, method, headers, JSON.stringify(data))
      .then(parseJSON);
  }

  post(url, data) {
    return this.json(url, 'POST', data);
  }

  get(url) {
    return this.json(url, 'GET', undefined);
  }
}

export default BaseService;
