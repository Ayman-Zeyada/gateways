const express = require('express');
const router = express.Router();

const Device = require('../../models/device');
const Gateway = require('../../models/gateway');
const logger = require('../../lib/logger');


// @route  GET api/devices
// @desc   Get all devices
// @access public
router.get('/', (req, res) => { });

// @route  POST api/devices
// @desc   create new device
// @access public
router.post('/', (req, res) => {
  logger.info('*** create new device');
  const device = new Device(req.body);
  device.save()
    .then(savedDevice => {
      logger.info('*** create new device success');
      res.send({ success: true, data: savedDevice });
    })
    .catch(err => {
      logger.info(`*** create new device error ${err}`);
      res.send({ success: false, error: err.message })
    });
});

// @route  DELETE api/devices/:id
// @desc   delete a device
// @access public
router.delete('/:id', (req, res) => {
  logger.info('*** delete a device by id');
  Device.findByIdAndRemove(req.params.id)
    .then((device) => {
      Gateway.findByIdAndUpdate(device.gatewayId, {
        $pull: {
          devices: req.params.id
        }
      }, { new: true })
      .then((updatedGateway) => {
        logger.info('*** delete a device by id success');
        res.send({ success: true, data: updatedGateway})
      })
      .catch(err => {
        logger.error(`*** delete a device by id error ${err}`);
        res.status(404).json({ success: false, message: err.message })
      });
    })
    .catch(err => {
      logger.error(`*** delete a device by id error ${err}`);
      res.status(404).json({ success: false, message: err.message })
    });
});

module.exports = router;