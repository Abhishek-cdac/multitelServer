var express = require("express");
var router = express.Router();
var digitotal = require("../controller/digitotal_ctrl");
const middileware = require("../middileware");

router.post(
  "/addDigitotal",
  middileware.checkAuthentication,
  digitotal.addDigitotal
);
router.post("/getDigitotalBySlug", digitotal.getDigitotalBySlug);
router.get("/getAllDigitotal", digitotal.getAllDigitotal);
router.put(
  "/editDigitotal",
  middileware.checkAuthentication,
  digitotal.editDigitotal
);
router.delete(
  "/deleteDigitotal",
  middileware.checkAuthentication,
  digitotal.deleteDigitotal
);
module.exports = router;
