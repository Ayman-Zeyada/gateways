const mongoose = require('mongoose');

const logger = require('./logger');

class DataBase {
  open(callback) {
      logger.info('connecting to the database');
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      };

      mongoose.connect(
        process.env.MONGO_URI,
        options,
      );
  
      mongoose.connection.on('error', (err) => {
        callback(err, false);
      });
  
      mongoose.connection.once('open', () => {
        callback(null, true);
      });
    }
}

module.exports = new DataBase();
