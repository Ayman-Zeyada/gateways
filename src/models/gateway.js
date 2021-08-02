const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    validate: [validateIPaddress, 'You have entered an invalid IP address!']
  },
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }]
});

function validateIPaddress(ipaddress) {  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return true;
  }  
  
  return false;
}  

module.exports = Gateway = mongoose.model('Gateway', GatewaySchema);