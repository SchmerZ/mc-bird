import config from '../config'

const ErrorHandler = (err, req, res, next) => {
  if (err) {
    if (config.Environment === 'development') {
      console.log(err);
    }

    const statusCode = err.status || err.statusCode || 500;
    const body = (req.body && JSON.stringify(req.body)) || '';
    const errorMessage = err.statusText || err.message || '';

    if (err instanceof Error && statusCode !== 401) {
      console.warn(`${statusCode} ${req.url} ${body} Server error: ${errorMessage} Stack: ${err.stack}`);
      return res.status(statusCode).send({message: errorMessage, body: {message: errorMessage}});
    }
  }
};

export default () => ErrorHandler;
