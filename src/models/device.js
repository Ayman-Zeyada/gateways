const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: String,
    enum: ['online', 'offline'],
    default: 'online'
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

