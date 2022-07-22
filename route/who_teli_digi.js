var express = require("express");
var router = express.Router();
var WhoTeliDigi = require("../controller/who_teli_digi_ctrl");
const middileware = require("../middileware");

router.post(
  "/addWho_Teli_digi",
  middileware.checkAuthentication,
  WhoTeliDigi.addWho_Teli_digi
);
router.post("/getWho_teli_digiBySlug", WhoTeliDigi.getWho_teli_digiBySlug);
router.get("/getAllWho_Teli_digi", WhoTeliDigi.getAllWho_Teli_digi);
router.put(
  "/editWho_teli_digi",
  middileware.checkAuthentication,
  WhoTeliDigi.editWho_teli_digi
);
router.delete(
  "/deleteWho_teli_digi",
  middileware.checkAuthentication,
  WhoTeliDigi.deleteWho_teli_digi
);
module.exports = router;
