"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const who_teli_digi = db.who_teli_digi;
const { Op, sequelize } = require("sequelize");

let WhoTeliDigi = {};

WhoTeliDigi.addWho_Teli_digi = async (req, res) => {
  try {
    let { title, description, sub_description, image } = req.body;
    let { userId } = req.body;
    let slug = await utility.generateSlug(title, who_teli_digi);
    if (req.files) {
      console.log(req.files);
      var filename = await utility.fileupload(req.files);
    }
    let Data = {
      title: title,
      userId: userId,
      description: description,
      sub_description: sub_description,
      slug: slug,
      image: filename,
    };

    let result = await who_teli_digi.create(Data);
    if (result) {
      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.DATA_SAVED_SUCCESS,
        data: result,
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

WhoTeliDigi.getWho_teli_digiBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    who_teli_digi
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
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

WhoTeliDigi.getAllWho_Teli_digi = async (req, res) => {
  try {
    let data = await who_teli_digi.findAll({
      where: {
        status: true,
      },
    });
    let massage =
      data.length > 0
        ? Constant.DATA_RETRIEVED_SUCCESS
        : Constant.NO_DATA_FOUND;
    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

WhoTeliDigi.editWho_teli_digi = async (req, res) => {
  try {
    let { id, title, description, sub_description, image } = req.body;
    let { userId } = req.body;
    if (req.files) {
      console.log(req.files);
      var filename = await utility.fileupload(req.files);
    }
    let Data = {
      title: title,
      description: description,
      sub_description: sub_description,
      userId: userId,
      image: filename,
    };

    who_teli_digi
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
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

WhoTeliDigi.deleteWho_teli_digi = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.body;
    who_teli_digi
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
module.exports = WhoTeliDigi;
