var express = require("express");
var router = express.Router();
var multitel_pride = require("../controller/multitel_pride_ctrl");
const middileware = require("../middileware");

router.post(
  "/addMultitelPride",
  middileware.checkAuthentication,
  multitel_pride.addMultitelPride
);
router.post("/getMultitelPrideById", multitel_pride.getMultitelPrideById);
router.get("/getAllMultitelPride", multitel_pride.getAllMultitelPride);
router.put(
  "/editMultitelPride",
  middileware.checkAuthentication,
  multitel_pride.editMultitelPride
);
router.delete(
  "/deleteMultitelPride",
  middileware.checkAuthentication,
  multitel_pride.deleteMultitelPride
);
router.post("/getMultitelPrideBySlug", multitel_pride.getMultitelPrideBySlug);
module.exports = router;
