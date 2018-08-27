import onFinished from 'on-finished'
import chalk from 'chalk'

export default () => (req, res, next) => {
  const startTime = Date.now();

  onFinished(res, () => {
    const endTime = Date.now();
    const timMs = endTime - startTime;

    console.log(chalk.green(`${req.method} ${res.statusCode} ${chalk.blue(req.originalUrl)} has taken ${timMs} ms.`));
  });

  next();
}
