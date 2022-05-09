var express = require('express')
var router = express.Router()
var middileware = require('../middileware')
var payments =  require('../controller/payment_ctr');


router.put('/createRefrenceId',payments.createRefrenceId);
router.post('/createpayment',payments.createPayment);
router.get('/getAllPayment',payments.getAllPayment);
router.post('/getOrderDetails',middileware.checkAuthentication,payments.getOrderDetails);
router.post('/getAdminOrderDetails',middileware.checkAuthentication,payments.getAdminOrderDetails);


module.exports = router