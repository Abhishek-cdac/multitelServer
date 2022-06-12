var express = require("express");
var router = express.Router();
var recruitment = require("../controller/recruitment_ctrl");
const middileware = require("../middileware");

router.post('/addRecruitmentCategory',middileware.checkAuthentication,recruitment.addRecruitmentCategory)
router.get('/getAllRecruitmentCategory',recruitment.getAllRecruitmentCategory)
router.put('/editRecritmentCategory',middileware.checkAuthentication,recruitment.editRecritmentCategory)
router.delete('/deleteRecruitmentCategory',middileware.checkAuthentication,recruitment.deleteRecruitmentCategory)



router.post('/addRecruitment',middileware.checkAuthentication,recruitment.addRecruitment)
router.post('/getRecruitmentBySlug',recruitment.getRecruitmentBySlug)
router.get('/getAllRecruitment',recruitment.getAllRecruitment)
router.post('/getRecruitmentByCategory',recruitment.getRecruitmentByCategory)
router.put('/editRecruitment',middileware.checkAuthentication,recruitment.editRecruitment)
router.delete('/deleteRecruitment',middileware.checkAuthentication,recruitment.deleteRecruitment)
module.exports = router