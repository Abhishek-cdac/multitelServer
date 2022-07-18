"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const corporate_category = db.corporate_category;
const corporate = db.corporate;
const { Op, sequelize } = require("sequelize");

let corporates = {}

corporates.addCorporateCategory = async (req, res) => {
    try {
      let { name, userId } = req.body;
      let slug = await utility.generateSlug(name, corporate_category);
      let Data = {
        name: name,
        userId: userId,
        slug: slug,
      };
      console.log(Data);
      let result = await corporate_category.create(Data);
      if (result) {
        return res.status(Constant.SUCCESS_CODE).json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.CATEGORY_SAVED_SUCCESS,
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

  corporates.editCorporateCategory = async (req, res) => {
    try {
      let { id, name } = req.body;
      let { userId } = req.body;
      let Data = {
        name: name,
        userId: userId,
      };
  
      corporate_category
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
              massage: Constant.CATEGORY_UPDATE_SUCCESS,
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
  
  corporates.deleteCorporateCategory = async (req, res) => {
    try {
      let { id } = req.body;
      let { userId } = req.body;
      corporate_category
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
              massage: Constant.CATEGORY_DELETE_SUCCESS,
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
  
corporates.getAllCorporateCategory = async (req, res) => {
  try {
    let data = await corporate_category.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: corporate,
        },
      ],
    });
    let massage =
      data.length > 0
        ? Constant.CATEGORY_RETRIEVED_SUCCESS
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
corporates.addCorporate = async (req, res) => {
    try {
      let { name, corporateId, description} = req.body;
      let { userId } = req.body;
      let slug = await utility.generateSlug(name, corporate);
  
      let Data = {
        Name: name,
        corporateId: corporateId,
        userId: userId,
        description: description,
        slug: slug,
      };
      corporate
        .create(Data)
        .then(async (result) => {
          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.DATA_SAVED_SUCCESS,
            data: result,
          });
        })
        .catch((error) => {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: Data,
          });
        });
    } catch (error) {
      return res.status(Constant.ERROR_CODE).json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: error,
      });
    }
  }
  corporates.getCorporate = async (req, res) => {
    try {
      let data = await corporate.findAll({
        where: {
          status: true,
        },
        include: [
          {
            model: corporate_category,
          },
        ],
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
  
corporates.editCorporate = async (req, res) => {
    try {
      let { id, name, corporateId, description } =
        req.body;
      let { userId } = req.body;
      corporate
        .findOne({
          where: {
            id: id,
            status: true,
          },
        })
        .then(async (result) => {
          if (result) {
            let slug = await utility.generateSlug(name, corporate);
            let Data = {
              Name: name,
              corporateId: corporateId,
              userId: userId,
              description: description,
              slug: slug,
            };
  
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
              data: null,
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
  
corporates.deleteCorporate = async (req, res) => {
    try {
      let { id } = req.body;
      corporate
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
  
corporates.getCorporateByCategory = async (req, res) => {
    try {
      let { slug } = req.body;
      let data = await corporate_category.findOne({
        where: {
          status: true,
          [Op.or]: [
            {
              slug: slug,
            },
          ],
        },
        include: [
          {
            model: corporate,
            where: {
              status: true,
            },
          },
        ],
      });
      let massage = data
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
  
corporates.getCorporateBySlug = async (req, res) => {
    try {
      let { slug } = req.body;
      corporate
        .findOne({
          where: {
            slug: slug,
            status: true,
          },
          include: [
            {
              model: corporate_category,
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
  module.exports = corporates