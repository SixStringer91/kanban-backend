const { finished } = require('stream');

const logerRequests = (req, res, next) => {
  const { method, url } = req;
  const body = JSON.stringify(req.body);
  const query = JSON.stringify(req.query);
  const start = Date.now();
  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    console.info(
      `\n METHOD: ${method}\n URL: ${url} \n STATUS: ${statusCode} \n QUERY: ${query} \n BODY: ${body} \n TIME: ${ms}`
    );
  });
};

const loggerErrors = (statusCode, message) => {
  console.warn(`\n CODE: ${statusCode}\n MESSAGE: ${message}`);
};

const uncaughtExceptionLogger = (error, origin) => {
  console.error(`${error} origin ${origin}`);
};

const unhandledRejectionLogger = message => {
  console.error(`Unhandled rejection detected: ${message}`);
};


module.exports = {
  unhandledRejectionLogger,
  uncaughtExceptionLogger,
  loggerErrors,
  logerRequests
}