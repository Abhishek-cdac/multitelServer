var express = require("express");
var router = express.Router();
var news = require("../controller/news_ctrl");
const middileware = require("../middileware");

router.post("/addNewsCategory",middileware.checkAuthentication,news.addNewsCategory);
router.get("/getAllNewsCategory",news.getAllNewsCategory);
router.put("/editNewsCategory",middileware.checkAuthentication,news.editNewsCategory)
router.delete("/deleteNewsCategory",middileware.checkAuthentication,news.deleteNewsCategory)


router.post("/addNews",middileware.checkAuthentication,news.addNews)
router.post("/getNewsByCategory",news.getNewsByCategory)
router.get("/getAllNews",news.getAllNews)
router.post("/getNewsBySlug",news.getNewsBySlug)
router.put("/editNews",middileware.checkAuthentication,news.editNews)
router.delete("/deleteNews",middileware.checkAuthentication,news.deleteNews)
module.exports = router
