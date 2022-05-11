const db = require("../models");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const vendor = db.vendor;
const Op = db.Sequelize.Op;
const Constant = require("../config/constant");
const utility = require("../helpers/utility");
let vendors = {};

vendors.createVendor = async (req, res) => {
  try {
    let result = await vendor.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (result.length > 0) {
      return res.status(Constant.FORBIDDEN_CODE).json({
        code: Constant.FORBIDDEN_CODE,
        massage: Constant.EMAIL_ALREADY_REGISTERED,
        data: null,
      });
    } else {
      let { userId } = req.user;
      req.body.userId = userId;
      let result = await vendor.create(req.body);

      if (req.files) {
        profile_img = await utility.fileupload(req.files);
        let userData = {
          profile_img: profile_img,
        };
        result.update(userData);
      }

      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.USER_SAVE_SUCCESS,
        data: result,
      });
    }
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null,
    });
  }
};

vendors.updateProfileVendor = async (req, res) => {
  try {
    let { userId } = req.user;
    let { email } = req.body;
    let result = await vendor.findOne({
      where: {
        email: email,
      },
    });
    result.update(req.body);

    if (req.files) {
      profile_img = await utility.fileupload(req.files);
      let userData = {
        profile_img: profile_img,
      };
      result.update(userData);
    }

    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: Constant.USER_DATA_UPDATE_SUCCESS,
      data: result,
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null,
    });
  }
};

vendors.deleteVendor = async (req, res) => {
  try {
    let result = await vendor.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (result.length > 0) {
      return res.status(Constant.FORBIDDEN_CODE).json({
        code: Constant.FORBIDDEN_CODE,
        massage: Constant.EMAIL_ALREADY_REGISTERED,
        data: null,
      });
    } else {
      result.update({
        status: false,
      });

      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.USER_DATA_UPDATE_SUCCESS,
        data: result,
      });
    }
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: null,
    });
  }
};

vendors.getVendors = async (req, res) => {
  try {
    let { category } = req.body;
    let condition = {
      status: true,
    };

    if (category) {
      condition = {
        status: true,
        category: {
          [Op.like]: `%${category}%`,
        },
      };
    }
    vendor
      .findAll({
        where: condition,
      })
      .then(async (result) => {
        return res.json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.SLIDE_RETRIEVE_SUCCESS,
          data: result,
        });
      })
      .catch((error) => {
        return res.json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

module.exports = vendors;
