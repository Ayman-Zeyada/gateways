const pino = require('pino');

class Logger {
  logger;
  constructor() {
    this.logger = pino({
      prettyPrint: true
    });
  }

  info(message) {
    if (process.env.LOGGER === 'true') {
      this.logger.info(message);
    }
  }

  error(message) {
    if (process.env.LOGGER === 'true') {
      this.logger.error(message);
    }
  }
}

module.exports = new Logger();