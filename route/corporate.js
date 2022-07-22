var express = require("express");
var router = express.Router();
var corporate = require("../controller/corporate_ctrl");
const middileware = require("../middileware");

router.post('/addCorporateCategory',middileware.checkAuthentication,corporate.addCorporateCategory)
router.get('/getAllCorporateCategory',corporate.getAllCorporateCategory)
router.put('/editCorporateCategory',middileware.checkAuthentication,corporate.editCorporateCategory)
router.delete('/deleteCorporateCategory',middileware.checkAuthentication,corporate.deleteCorporateCategory)


router.post('/addCorporate',middileware.checkAuthentication,corporate.addCorporate)
router.get('/getCorporate',corporate.getCorporate)
router.put('/editCorporate',middileware.checkAuthentication,corporate.editCorporate)
router.delete('/deleteCorporate',middileware.checkAuthentication,corporate.deleteCorporate)
router.post('/getCorporateByCategory',corporate.getCorporateByCategory)
router.post('/getCorporateBySlug',corporate.getCorporateBySlug)

module.exports = router