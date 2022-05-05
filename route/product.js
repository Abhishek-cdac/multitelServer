var express = require('express')
var router = express.Router()
var product = require('../controller/product_ctr')
const middileware = require('../middileware')

router.post('/addCategory', middileware.checkAuthentication, product.addCategory);
router.put('/editCategory', middileware.checkAuthentication, product.editCategory);
router.delete('/deleteCategory', middileware.checkAuthentication, product.deleteCategory);
router.get('/getAllCategory', product.getAllCategory);

router.get('/', product.getProducts);
router.post('/add', middileware.checkAuthentication, product.add);
router.put('/edit', middileware.checkAuthentication, product.edit);
router.delete('/delete', middileware.checkAuthentication, product.delete);
router.post('/getProductsByCategory', product.getProductsByCategory);
router.post('/getProductBySlug',product.getProductBySlug);
router.get('/getLatestProducts', product.getLatestProducts);

module.exports = router;