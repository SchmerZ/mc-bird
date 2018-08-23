import chalk from 'chalk'

const errorHandler = (err, req, res, next) => {
  if (err) {
    const statusCode = err.status || err.statusCode || 500;
    const body = (req.body && JSON.stringify(req.body)) || '';
    const errorMessage = err.statusText || err.message || '';

    if (err instanceof Error && statusCode !== 401) {

      console.log(`${chalk.black.bgRed.bold(statusCode)} ${chalk.blue.underline(req.url)} ${body} ${chalk.red('Server error: ' + errorMessage)} Stack: ${err.stack}`);

      return res.status(statusCode).send({message: errorMessage, body: {message: errorMessage}});
    }
  }
};

export default () => errorHandler;
