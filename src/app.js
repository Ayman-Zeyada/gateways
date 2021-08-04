const express = require('express');

const database = require('./lib/database');
const logger = require('./lib/logger');
const gateways = require('./routes/api/gateways');
const devices = require('./routes/api/devices');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

database.open((err) => {
  if (!err) {
    logger.info('connected to the database successfully!');
  } else {
    logger.error('error connecting to the database: ' + err);
  }
});

app.use('/api/gateways', gateways);
app.use('/api/devices', devices);

module.exports = app;