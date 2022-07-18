"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const multitel_pride = db.multitel_pride;
const fs = require("fs");
const path = require("path");
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
        const images = [];
        req.files.image = !req.files.image.length
          ? [req.files.image]
          : req.files.image;
        for (let i = 0; i < req.files.image.length; i++) {
          const image = req.files.image[i];
          console.log(image);
          let currentPath = process.cwd();
          let file_path = path.join(currentPath, "/public/images/" + image.name);

          await new Promise((resolve) => {
            image.mv(file_path, (err) => {
              if (err) throw err;
              console.log(image);
              if (!err) images.push(`${image.name}`);
              resolve(true);
            });
          });
        }
        console.log("utility", images);
        let userData = {
          image: images,
        };
        result.update(userData);
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

multitel.getMultitelPrideById = async (req, res) => {
  try {
    let { id } = req.body;
    let data = await multitel_pride.findAll({
      where: {
        id: id,
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

multitel.getMultitelPrideBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    let data = await multitel_pride.findAll({
      where: {
        slug: slug,
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

multitel.getAllMultitelPride = async (req, res) => {
  try {
    let data = await multitel_pride.findAll({
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

multitel.editMultitelPride = async (req, res) => {
  try {
    let { id, title, description, sort_description, userId } = req.body;

    multitel_pride
      .findOne({
        where: {
          id: id,
          status: true,
        },
      })
      .then(async (result) => {
        if (result) {
          let Data = {
            title: title,
            description: description,
            sort_description: sort_description,
            userId: userId,
          };

          await result
            .update(Data)
            .then(async (result) => {
              if (req.files) {
                const images = [];
                req.files.image = !req.files.image.length
                  ? [req.files.image]
                  : req.files.image;
                for (let i = 0; i < req.files.image.length; i++) {
                  const image = req.files.image[i];
                  console.log(image);
                  let currentPath = process.cwd();
                  let file_path = path.join(
                    currentPath,
                    "/public/images/" + image.name
                  );

                  await new Promise((resolve) => {
                    image.mv(file_path, (err) => {
                      if (err) throw err;
                      console.log(image);
                      if (!err) images.push(`${image.name}`);
                      resolve(true);
                    });
                  });
                }
                console.log("utility", images);
                let userData = {
                  image: images,
                };
                result.update(userData);
              }

              return res.status(Constant.SUCCESS_CODE).json({
                code: Constant.SUCCESS_CODE,
                message: Constant.DATA_UPDATED_SUCCESS,
                data: result,
              });
            })
            .catch((error) => {
              return res.status(Constant.SERVER_ERROR).json({
                code: Constant.SERVER_ERROR,
                message: Constant.SOMETHING_WENT_WRONG,
                data: error.message,
              });
            });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUEST_NOT_FOUND,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.SERVER_ERROR).json({
          code: Constant.SERVER_ERROR,
          message: Constant.SOMETHING_WENT_WRONG,
          data: error.message,
        });
      });
  } catch (error) {
    return res.status(Constant.SERVER_ERROR).json({
      code: Constant.SERVER_ERROR,
      message: Constant.SOMETHING_WENT_WRONG,
      data: error.message,
    });
  }
};

multitel.deleteMultitelPride = async (req, res) => {
  try {
    let { id } = req.body;
    multitel_pride
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
module.exports = multitel;
