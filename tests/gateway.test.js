const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const Gateway = require('../src/models/gateway');
const Device = require('../src/models/device');

const gatewayOneId = new mongoose.Types.ObjectId();
const deviceOneId = new mongoose.Types.ObjectId();
const gatewayOne = {
  _id: gatewayOneId,
  serialNumber: '22TYUY67ED',
  name: 'Test Gateway Name',
  ipv4Address: '192.168.1.16'
};

beforeEach(async () => {
  await Gateway.deleteMany();
  await new Gateway(gatewayOne).save();
});

test('Should get all gateways', async () => {
  await request(app).get('/api/gateways').send().expect(200);
});

test('Should add a new gateway', async () => {
  await request(app).post('/api/gateways').send({
    serialNumber: '55tYYgd677',
    name: 'New Gateway Name',
    ipv4Address: '192.168.1.1'
  }).expect(200);
});

test('Should not add a new gateway with a duplicate serial number', async () => {
  await request(app).post('/api/gateways').send({
    serialNumber: gatewayOne.serialNumber,
    name: 'New Gateway Name',
    ipv4Address: '192.168.1.1'
  }).expect(400);
});

test('Should not add a new gateway with an invalid IP address', async () => {
  await request(app).post('/api/gateways').send({
    serialNumber: '77ffrt41w5',
    name: 'New Gateway Name',
    ipv4Address: '42511785634'
  }).expect(400);
});

test('Should not add a new gateway with an IP address version 6', async () => {
  await request(app).post('/api/gateways').send({
    serialNumber: '445weo55kd',
    name: 'New Gateway Name',
    ipv4Address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
  }).expect(400);
});

test('Should delete a gateway', async () => {
  await request(app).delete(`/api/gateways/${gatewayOneId}`).send().expect(200);
  const gateways = await Gateway.find();

  expect(gateways.length).toBe(0);
});

test('Should add a new device to a gateway', async () => {
  await request(app).post(`/api/gateways/${gatewayOneId}/devices`).send({
    _id: deviceOneId,
    uid: 1245123,
    vendor: 'Company',
    status: 'offline',
  }).expect(200);

  const device = await Device.findById(deviceOneId);
  expect(device).toMatchObject({
    uid: 1245123,
    vendor: 'Company',
    status: 'offline'
  });

  expect(new mongoose.Types.ObjectId(device.gatewayId))
    .toEqual(new mongoose.Types.ObjectId(gatewayOneId));
});