var express = require("express");
var router = express.Router();
var sustainability = require("../controller/sustainability_category_ctrl");
const middileware = require("../middileware");

router.post(
  "/addSustainabilityCategory",
  middileware.checkAuthentication,
  sustainability.addSustainabilityCategory
);
router.put(
  "/editSustainabilityCategory",
  middileware.checkAuthentication,
  sustainability.editSustainabilityCategory
);
router.delete(
  "/deleteSustainabilityCategory",
  middileware.checkAuthentication,
  sustainability.deleteSustainabilityCategory
);
router.get(
  "/getAllSustainabilityCategory",
  middileware.checkAuthentication,
  sustainability.getAllSustainabilityCategory
);

router.post(
  "/addSustainability",
  middileware.checkAuthentication,
  sustainability.addSustainability
);
router.get("/getSustainability", sustainability.getSustainability);
router.put(
  "/editSustainability",
  middileware.checkAuthentication,
  sustainability.editSustainability
);
router.delete(
  "/deleteSustainability",
  middileware.checkAuthentication,
  sustainability.deleteSustainability
);
router.post(
  "/getSustainabilityByCategory",
  sustainability.getSustainabilityByCategory
);
router.post("/getSustainabilityBySlug", sustainability.getSustainabilityBySlug);
module.exports = router;
