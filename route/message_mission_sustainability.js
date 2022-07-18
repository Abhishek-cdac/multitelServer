var express = require("express");
var router = express.Router();
var message_mission_sustainability = require("../controller/message_mission_sustainability_ctrl");
const middileware = require("../middileware");

router.post(
  "/addMsgMissionSus",
  middileware.checkAuthentication,
  message_mission_sustainability.addMsgMissionSus
);
router.post(
  "/getMsgMissionSusBySlug",
  message_mission_sustainability.getMsgMissionSusBySlug
);
router.get(
  "/getAllMsgMissionSus",
  message_mission_sustainability.getAllMsgMissionSus
);
router.put(
  "/editMsgMissionSus",
  middileware.checkAuthentication,
  message_mission_sustainability.editMsgMissionSus
);
router.delete(
  "/deleteMsgMissionSus",
  middileware.checkAuthentication,
  message_mission_sustainability.deleteMsgMissionSus
);
module.exports = router;
