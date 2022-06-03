"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const multitel_pride = db.multitel_pride;
const multitel_pride_image = db.multitel_pride_image;
const { Op, sequelize } = require("sequelize");

let multitel = {};

multitel.addMultitelPride = async (req, res) => {
  try {
    let { title, description, sort_description } = req.body;
    let { userId } = req.body;
    let slug = await utility.generateSlug(title, multitel_pride);
    let Data = {
      title: title,
      userId: userId,
      description: description,
      sort_description: sort_description,
      slug: slug,
    };
    console.log(Data);
    let result = await multitel_pride.create(Data);
    if (result) {
      if (req.files) {
        let filename = await utility.fileupload1(req.files);
        console.log(filename);
        if (filename.length > 0) {
          filename.filter((obj) => {
            obj.title_Id = result.id;
          });
          await multitel_pride_image.bulkCreate(filename);
        }
      }
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

multitel.getMultitelPride = async (req, res) => {
  try {
    let { id } = req.body;
    let data = await multitel_pride.findAll({
      include: [
        {
          model: multitel_pride_image,
        },
      ],
      where: {
        id: id,
        status: true,
      },
    });
    let massage =
      data.length > 0 ? Constant.CART_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND;
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

module.exports = multitel;
