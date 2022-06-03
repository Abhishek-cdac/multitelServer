var express = require("express");
var router = express.Router();
var multitel_pride = require("../controller/multitel_pride_ctrl");
const middileware = require("../middileware");

router.post("/addMultitelPride", multitel_pride.addMultitelPride);
router.get("/getMultitelPride", multitel_pride.getMultitelPride);
module.exports = router;
