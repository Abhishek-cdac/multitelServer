var express = require("express");
var router = express.Router();
var contact_us = require("../controller/contact_us_ctrl");
const middileware = require("../middileware");

router.post("/addContactUs", contact_us.addContactUs);
router.get("/getAllContactUs", contact_us.getAllContactUs);
router.delete(
  "/deleteContactUs",
  middileware.checkAuthentication,
  contact_us.deleteContactUs
);

module.exports = router;
