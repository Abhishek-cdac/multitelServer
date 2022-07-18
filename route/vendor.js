var express = require('express')
var router = express.Router()
var vendor = require('../controller/vendor_ctrl')
const middileware = require('../middileware')
// router.post('/userRegistration', user.userRegistration);

router.post('/createVendor', middileware.checkAuthentication,vendor.createVendor);
router.put('/updateVendor', middileware.checkAuthentication,vendor.updateProfileVendor);
router.delete('/deleteVendor', middileware.checkAuthentication,vendor.deleteVendor);
router.post('/getVendors', vendor.getVendors);


module.exports = router;