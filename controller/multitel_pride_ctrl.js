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
        //console.log(filename);
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

multitel.getMultitelPrideById = async (req, res) => {
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
      include: [
        {
          model: multitel_pride_image,
        },
      ],
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
      include: [
        {
          model: multitel_pride_image,
        },
      ],
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
                let filename = await utility.fileupload1(req.files);

                if (filename.length) {
                  filename.filter((obj) => {
                    obj.title_Id = id;
                  });

                  let resultDocuments = await multitel_pride_image.findAll({
                    where: {
                      title_Id: id,
                      imageName: {
                        [Op.in]: filename.map((o) => o["imageName"]),
                      },
                    },
                  });

                  let listCreateDoc = [];

                  if (resultDocuments) {
                    async function updateDoc(i) {
                      if (i < filename.length) {
                        let obj = filename[i];
                        let objExist = resultDocuments.find(
                          (element) => element.imageName === obj.imageName
                        );
                        if (objExist) {
                          await objExist.update({
                            image: obj.image,
                          });
                          updateDoc(i + 1);
                        } else {
                          listCreateDoc.push(obj);
                          updateDoc(i + 1);
                        }
                      } else {
                        if (listCreateDoc) {
                          await multitel_pride_image.bulkCreate(listCreateDoc);
                        }
                      }
                    }
                    updateDoc(0);
                  } else {
                    await multitel_pride_image.bulkCreate(filename);
                  }
                }
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
