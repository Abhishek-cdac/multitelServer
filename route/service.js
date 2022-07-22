var express = require('express')
var router = express.Router()
var services = require('../controller/service_ctr')
const middileware = require('../middileware')

router.post('/addservice', middileware.checkAuthentication, services.addService);
router.put('/editservice', middileware.checkAuthentication, services.editService);
router.delete('/deleteservice', middileware.checkAuthentication, services.deleteService);
router.get('/getAllservice', services.getAllService);
router.post('/getservicesBySlug',services.getServiceBySlug);



router.get('/product/', services.getProducts);
router.post('/product/add', middileware.checkAuthentication, services.add);
router.put('/product/edit', middileware.checkAuthentication, services.edit);
router.delete('/product/delete', middileware.checkAuthentication, services.delete);
router.post('/product/getProductsByService', services.getProductsByCategory);
router.post('/product/getProductBySlug',services.getProductBySlug);


module.exports = router;