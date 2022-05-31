"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const message_tag = db.message_tag;
const message_mission_sustainability = db.message_mission_sustainability;
const message_tag_relationship = db.message_tag_relationship;
const { Op, sequelize } = require("sequelize");

let message = {};

message.addMsgMissionSus = async (req, res) => {
  try {
    let {
      name,
      description,
      sub_heading,
      sub_heading_2,
      image,
      description_2,
      sub_heading_3,
      description_3,
      tag,
    } = req.body;
    let { userId } = req.body;
    let slug = await utility.generateSlug(name, message_mission_sustainability);
    if (req.files) {
      console.log(req.files);
      var filename = await utility.fileupload(req.files);
    }
    let Data = {
      name: name,
      userId: userId,
      description: description,
      sub_heading: sub_heading,
      sub_heading_2: sub_heading_2,
      description_2: description_2,
      sub_heading_3: sub_heading_3,
      description_3: description_3,
      slug: slug,
      image: filename,
    };

    let result = await message_mission_sustainability.create(Data);
    if (result) {
      if (tag) {
        let data = await utility.checkTagAndCreate1(
          tag,
          result.id,
          message_tag,
          message_tag_relationship
        );
      }

      let data = await message_mission_sustainability.findAll({
        where: {
          status: true,
        },
        include: [
          {
            model: message_tag,
          },
        ],
      });
      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.DATA_SAVED_SUCCESS,
        data: data,
      });
    } else {
      return res.status(Constant.ERROR_CODE).json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: result,
      });
    }
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

message.getMsgMissionSusBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    message_mission_sustainability
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
        include: [
          {
            model: message_tag,
          },
        ],
      })
      .then(async (result) => {
        let massage = result
          ? Constant.DATA_RETRIEVED_SUCCESS
          : Constant.NO_DATA_FOUND;
        return res.status(Constant.SUCCESS_CODE).json({
          code: Constant.SUCCESS_CODE,
          massage: massage,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

message.editMsgMissionSus = async (req, res) => {
  try {
    let {
      id,
      name,
      description,
      sub_heading,
      sub_heading_2,
      image,
      description_2,
      sub_heading_3,
      description_3,
      tag,
    } = req.body;
    let { userId } = req.body;
    if (req.files) {
      console.log(req.files);
      var filename = await utility.fileupload(req.files);
    }
    let Data = {
      name: name,
      description: description,
      sub_heading: sub_heading,
      sub_heading_2: sub_heading_2,
      description_2: description_2,
      sub_heading_3: sub_heading_3,
      description_3: description_3,
      userId: userId,
      image: filename,
    };

    message_mission_sustainability
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          if (tag) {
            let data = await utility.checkTagAndCreate1(
              tag,
              result.id,
              message_tag,
              message_tag_relationship
            );
          }
          result.update(Data);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.DATA_UPDATED_SUCCESS,
            data: result,
          });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

message.deleteMsgMissionSus = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.body;
    message_mission_sustainability
      .findOne({
        where: {
          id: id,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let Data = {
            status: 0,
            userId: userId,
          };
          result.update(Data);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.DATA_DELETED_SUCCESS,
            data: result,
          });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};
module.exports = message;
