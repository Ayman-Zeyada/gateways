const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceStatus = require('../lib/device-status');

const DeviceSchema = new Schema({
  uid: {
    type: Number,
    unique: true,
    required: true
  },
  vendor: {
    type: String,
  },
  status: {
    type: Number,
    defaultValue: DeviceStatus.ONLINE
  },
  gatewayId: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Device = mongoose.model('Device', DeviceSchema);

