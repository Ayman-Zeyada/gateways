const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const GatewaySchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  ipv4Address: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isIP(value, 4)) {// (value, version): boolean
        throw new Error('You have entered an invalid IP address');
      }
    }
  },
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }]
});

module.exports = Gateway = mongoose.model('Gateway', GatewaySchema);