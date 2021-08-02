const express = require('express');
const router = express.Router();

const Gateway = require('../../models/gateway');
const Device = require('../../models/device');
const logger = require('../../lib/logger');

// @route  GET api/gateways
// @desc   get all gateways
// @access public
router.get('/', (req, res) => {
  logger.info('*** get gateways');
  Gateway.find()
    .then(gateways => {
      logger.info('*** get gateways success');
      res.json({ success: true, data: gateways });
    }).catch(err => {
      logger.error(`*** get gateways error: ${err}`);
      res.status(400).json({ success: false, message: err.message });
    });
});

// @route  POST api/gateways
// @desc   create a gateway
// @access public
router.post('/', (req, res) => {
  logger.info('*** create a gateway');
  const gateway = new Gateway(req.body);

  gateway.save()
    .then(savedGateway => {
      logger.info('*** create a gateway success');
      res.json({ success: true, data: savedGateway })
    })
    .catch(err => {
      logger.error(`*** create a gateway error: ${err}`);
      res.status(400).json({ success: false, message: err.message });
    });
});

// @route  GET api/gateways/:id
// @desc   get a gateway with devices list
// @access public
router.get('/:id', (req, res) => {
  logger.info('*** get a gateway by id');
  Gateway.findById(req.params.id)
    .populate('devices')
    .exec((err, gateway) => {
      if (!err) {
        logger.info('*** get a gateway by id success');
        res.json({ success: true, data: gateway});
      } else {
        logger.error(`*** get a gateway by id error ${err}`);
        res.status(404).json({ success: false, message: err.message });
      }
    });
});

// @route  DELETE api/gateways/:id
// @desc   delete a gateway by id
// @access public
router.delete('/:id', (req, res) => {
  logger.info('*** delete a gateway by id');
  Gateway.findByIdAndRemove(req.params.id)
    .then(() => {
      logger.info('*** delete a gateway by id success');
      res.json({ success: true });
    })
    .catch(err => {
      logger.error(`*** delete a gateway by id error ${err}`);
      res.status(404).json({ success: false, message: err.message })
    });
});

// @route  POST api/gateways/:id/devices
// @desc   add a device to a gateway
// @access public
router.post('/:id/devices', async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.id);
    if (gateway.devices.length >= 10) {
      res.status(400).json({ success: false, message: 'Cannot add more than 10 devices'});
      return;
    }

    const device = new Device(req.body);
    device.gatewayId = gateway._id;
    const savedDevice = await device.save();
    gateway.devices.push(savedDevice._id);
    const savedGateway = await gateway.save();
    res.send(savedGateway);
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;