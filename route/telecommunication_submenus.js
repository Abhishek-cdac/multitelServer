var express = require("express");
var router = express.Router();
var telecommnication = require("../controller/telecommunication_submenus_ctrl");
const middileware = require("../middileware");

router.post(
  "/addTelecommunicationMenus",
  middileware.checkAuthentication,
  telecommnication.addTelecommunicationMenus
);
router.post(
  "/getTelecommunicationMenusBySlug",
  telecommnication.getTelecommunicationMenusBySlug
);

router.get(
  "/getAllTelecommnicationMenus",
  telecommnication.getAllTelecommnicationMenus
);

router.put(
  "/editTelecommunicatiosMenus",
  middileware.checkAuthentication,
  telecommnication.editTelecommunicatiosMenus
);
router.delete(
  "/deleteTelecommunicationMenus",
  middileware.checkAuthentication,
  telecommnication.deleteTelecommunicationMenus
);

// telecommunication submenus route
router.post(
  "/addTelecommunication",
  middileware.checkAuthentication,
  telecommnication.addTelecommunication
);
router.post(
  "/getTelecommunicationBySlug",
  telecommnication.getTelecommunicationBySlug
);
router.post(
  "/getTelecommunicationByCategory",
  telecommnication.getTelecommunicationByCategory
);
router.get("/getAllTelecommnication", telecommnication.getAllTelecommnication);
router.put(
  "/editTelecommunication",
  middileware.checkAuthentication,
  telecommnication.editTelecommunication
);
router.delete(
  "/deleteTelecommunication",
  middileware.checkAuthentication,
  telecommnication.deleteTelecommunication
);
module.exports = router;
