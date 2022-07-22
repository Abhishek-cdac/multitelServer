var express = require('express')
var router = express.Router()
var promotions = require('../controller/Promotion_ctr')
const middileware = require('../middileware')

router.post('/addpromotions', middileware.checkAuthentication, promotions.addPromotion);
router.put('/editpromotions', middileware.checkAuthentication, promotions.editPromotion);
router.delete('/deletepromotions', middileware.checkAuthentication, promotions.deletePromotion);
router.get('/getAllpromotions', promotions.getAllPromotion);
router.post('/getPromotionsBySlug',promotions.getPromotionBySlug);

module.exports = router;