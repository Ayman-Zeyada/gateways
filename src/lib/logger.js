const pino = require('pino');

class Logger {
  logger;
  constructor() {
    this.logger = pino({
      prettyPrint: true
    });
  }
}

module.exports = new Logger().logger;