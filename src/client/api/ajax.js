const handleStatus = (response) => {
  if (response.status >= 200 && response.status < 300)
    return response;

  const error = new Error(response.statusText);
  error.response = response;
  error.status = response && response.status;

  throw error
};

const parseJSON = (response) => {
  if (response.status === 204 || response.headers.get('content-length') === '0')
    return undefined;

  return response.json()
};

export default {
  request(url, method, headers, data) {
    const fetchOptions = {
      method,
      credentials: 'same-origin',
      headers: {
        ...headers,
      },
      body: data,
    };

    return fetch(url, fetchOptions).then(handleStatus);
  },

  async json(url, method, data) {
    try {
      const response = await this.request(url, method, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, JSON.stringify(data));

      return await parseJSON(response);
    }
    catch (error) {
      throw await parseJSON(error.response);
    }
  },

  patch(url, data) {
    return this.json(url, 'PATCH', data)
  },

  put(url, data) {
    return this.json(url, 'PUT', data)
  },

  post(url, data) {
    return this.json(url, 'POST', data)
  },

  del(url) {
    return this.json(url, 'DELETE')
  },

  get(url) {
    return this.json(url, 'GET')
  }
}
