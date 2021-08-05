const fs = require('fs');
const { loggerErrors, uncaughtExceptionLogger, unhandledRejectionLogger } = require('./logger');

const CODE = 500;

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || CODE;
    if (message) {
      this.message = message;
    }
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  loggerErrors(statusCode, message);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

const uncaughtException = (err, origin) => {
  fs.writeFileSync(
    './crash-data.log',
    `Caught exception: ${err}\nException origin: ${origin}`
  );
  uncaughtExceptionLogger(err, origin);
  // process.exit(1);
};

const unhandledRejection = ({ message }) => {
  fs.writeFileSync(
    './crash-data.log',
    `Caught exception: ${message})`
  );
  unhandledRejectionLogger(message);
  process.exit(1);
};

module.exports={
  unhandledRejection,
  uncaughtException,
  handleError,
  ErrorHandler
}