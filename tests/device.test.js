const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const Gateway = require('../src/models/gateway');
const Device = require('../src/models/device');

const gatewayOneId = new mongoose.Types.ObjectId();
const deviceOneId = new mongoose.Types.ObjectId();

const gatewayOne = {
  _id: gatewayOneId,
  serialNumber: '45566TTf4u8',
  name: 'Test Gateway Name',
  ipv4Address: '192.168.1.255'
};

const deviceOne = {
  _id: deviceOneId,
  uid: 55846422485,
  vendor: 'Some Vendor',
  status: 'online'
};

beforeEach(async () => {
  await Gateway.deleteMany();
  await Device.deleteMany();
  const gateway = new Gateway(gatewayOne);
  const device = new Device(deviceOne);
  gateway.devices.push(deviceOneId);
  device.gatewayId = gatewayOneId;
  await gateway.save();
  await device.save();
});

test('Should get all devices', async () => {
  await request(app).get('/api/devices').send().expect(200);
});

test('Should Delete a device from a gateway', async () => {
  await request(app).delete(`/api/devices/${deviceOneId}`).send().expect(200);

  const gateway = await Gateway.findById(gatewayOneId);
  expect(gateway.devices.length).toBe(0);
});