"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const recruitment = db.recruitment;
const recruitment_category = db.recruitment_category;
const recruitment_description_tag = db.recruitment_description_tag;
const recruitment_requirement_tag = db.recruitment_requirement_tag;
const recruitment_requirement_tag_relationship =
  db.recruitment_requirement_tag_relationship;
const recruitment_description_tag_relationship =
  db.recruitment_description_tag_relationship;
const user_recruitment_form = db.user_recruitment_form;
const { Op, sequelize } = require("sequelize");

const recruitments = {};

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
    let {
      categoryId,
      recruitment_heading,
      description_heading,
      sub_description,
      description,
      description_tag,
      requirement_tag,
    } = req.body;
    let { userId } = req.body;
    let Data = {
      categoryId: categoryId,
      recruitment_heading: recruitment_heading,
      description_heading: description_heading,
      sub_description: sub_description,
      userId: userId,
      description: description,
      requirement_tag,
      description_tag,
    };

    if (req.files) {
      Data.image = await utility.fileupload2(req.files);
    }

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
      let Data = await recruitment.findAll({
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

      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.DATA_SAVED_SUCCESS,
        data: Data,
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
        {
          model: recruitment_category,
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
    let {
      id,
      categoryId,
      recruitment_heading,
      description_heading,
      sub_description,
      description,
      description_tag,
      requirement_tag,
    } = req.body;
    if (req.files) {
      var filename = await utility.fileupload2(req.files);
    }
    let { userId } = req.body;
    let Data = {
      description: description,
      userId: userId,
      categoryId: categoryId,
      recruitment_heading: recruitment_heading,
      description_heading: description_heading,
      sub_description: sub_description,
      description_tag,
      requirement_tag,
      image: filename,
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

recruitments.fillRecruitmentForm = async (req, res) => {
  try {
    let { name, message, phone, household, email, file, categoryId } = req.body;
    let { userId } = req.body;
    let slug = await utility.generateSlug(name, user_recruitment_form);
    if (req.files) {
      console.log(req.files);
      let file = req.files.file;
      var filename = await utility.fileupload2(req.files);
    }
    let Data = {
      name: name,
      userId: userId,
      categoryId: categoryId,
      message: message,
      phone: phone,
      slug: slug,
      household: household,
      email: email,
      file: filename,
    };

    let result = await user_recruitment_form.create(Data);
    if (result) {
      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.DATA_SAVED_SUCCESS,
        data: Data,
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

recruitments.getAllFillRecruitmentForm = async (req, res) => {
  try {
    let data = await user_recruitment_form.findAll({
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
module.exports = recruitments;
