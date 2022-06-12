"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const recruitment  = db.recruitment;
const recruitment_category = db.recruitment_category;
const recruitment_description_tag = db.recruitment_description_tag;
const recruitment_requirement_tag = db.recruitment_requirement_tag;
const recruitment_requirement_tag_relationship = db.recruitment_requirement_tag_relationship;
const recruitment_description_tag_relationship = db.recruitment_description_tag_relationship
const { Op, sequelize } = require("sequelize");

const recruitments = {}


recruitments.addRecruitmentCategory = async (req, res) => {
    try {
      let { name, userId } = req.body;
      let slug = await utility.generateSlug(name, recruitment_category);
      let Data = {
        name: name,
        userId: userId,
        slug: slug,
      };
      console.log(Data);
      let result = await recruitment_category.create(Data);
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
  
recruitments.editRecritmentCategory = async (req, res) => {
    try {
      let { id, name } = req.body;
      let { userId } = req.body;
      let Data = {
        name: name,
        userId: userId,
      };
  
      recruitment_category
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
  
recruitments.deleteRecruitmentCategory = async (req, res) => {
    try {
      let { id } = req.body;
      let { userId } = req.body;
      recruitment_category
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
  
recruitments.getAllRecruitmentCategory = async (req, res) => {
    try {
      let data = await recruitment_category.findAll({
        where: {
          status: true,
        },
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

recruitments.addRecruitment = async (req, res) => {
    try {
      let { name,categoryId,email,file,message,recruitment_heading,description_heading,phone,sub_description,household, description,description_tag,requirement_tag } = req.body;
      let { userId } = req.body;
      let slug = await utility.generateSlug(name, recruitment);
      if (req.files) {
        var filename = await utility.fileupload2(req.files);
      }
      let Data = {
        name: name,
        categoryId:categoryId,
        email:email,
        message:message,
        recruitment_heading:recruitment_heading,
        description_heading:description_heading,
        phone:phone,
        sub_description:sub_description,
        household:household,
        userId: userId,
        description: description,
        slug: slug,
        requirement_tag,
        description_tag,
        file:filename,
      };
  
      let result = await recruitment.create(Data);
      if (result) {
        if (requirement_tag) {
          let data = await utility.checkTagAndCreate1(
            requirement_tag,
            result.id,
            recruitment_requirement_tag,
            recruitment_requirement_tag_relationship
          );
        }
        
        if (description_tag) {
          let Data = await utility.checkTagAndCreate1(
            description_tag,
            result.id,
            recruitment_description_tag,
            recruitment_description_tag_relationship
          );
        }
        let data = await recruitment.findAll({
          where: {
            status: true,
          },
          include: [
            {
              model: recruitment_requirement_tag,
            },
            {
              model: recruitment_description_tag
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
    }catch (error) {
      return res.status(Constant.ERROR_CODE).json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: error,
      });
    }
  };

recruitments.getRecruitmentBySlug = async (req, res) => {
    try {
      let { slug } = req.body;
      recruitment
        .findOne({
          where: {
            slug: slug,
            status: true,
          },
          include: [
            {
              model: recruitment_category,
            },
            {
              model: recruitment_requirement_tag,
            },
            {
              model: recruitment_description_tag,
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
recruitments.getAllRecruitment = async (req, res) => {
    try {
      let data = await recruitment.findAll({
        where: {
          status: true,
        },
        include: [
          {
            model: recruitment_requirement_tag,
          },
          {
            model: recruitment_description_tag,
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

recruitments.getRecruitmentByCategory = async (req, res) => {
  try {
    let { slug } = req.body;
    recruitment_category
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
        include: [
          {
            model: recruitment,
            include: [
              {
                model: recruitment_requirement_tag,
              },
              {
                model: recruitment_description_tag,
              },
            ],
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

recruitments.editRecruitment = async (req, res) => {
  try {
    let { id, name,categoryId,email,file,message,recruitment_heading,description_heading,phone,sub_description,household, description,description_tag,requirement_tag } = req.body;
    if (req.files) {
      var filename = await utility.fileupload2(req.files);
    }
    let { userId } = req.body;
    let Data = {
      name: name,
      description: description,
      userId: userId,
      categoryId:categoryId,
      email:email,
      file:filename,
      message:message,
      recruitment_heading:recruitment_heading,
      description_heading:description_heading,
      phone:phone,
      sub_description:sub_description,
      household:household,
      description_tag,
      requirement_tag
    };
    recruitment
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          if (requirement_tag) {
            let data = await utility.checkTagAndCreate1(
              requirement_tag,
              result.id,
              recruitment_requirement_tag,
              recruitment_requirement_tag_relationship
            );
          }
          
          if (description_tag) {
            let Data = await utility.checkTagAndCreate1(
              description_tag,
              result.id,
              recruitment_description_tag,
              recruitment_description_tag_relationship
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

recruitments.deleteRecruitment = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.body;
    recruitment
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
  module.exports = recruitments