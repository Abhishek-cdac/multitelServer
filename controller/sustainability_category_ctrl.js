"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const sustainability_category = db.sustainability_category;
const sustainability = db.sustainability;
const { Op, sequelize } = require("sequelize");

let sustainabilities = {};

sustainabilities.addSustainabilityCategory = async (req, res) => {
  try {
    let { name, userId } = req.body;
    let slug = await utility.generateSlug(name, sustainability_category);
    let Data = {
      name: name,
      userId: userId,
      slug: slug,
    };
    console.log(Data);
    let result = await sustainability_category.create(Data);
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

sustainabilities.editSustainabilityCategory = async (req, res) => {
  try {
    let { id, name } = req.body;
    let { userId } = req.body;
    let Data = {
      name: name,
      userId: userId,
    };

    sustainability_category
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

sustainabilities.deleteSustainabilityCategory = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.body;
    sustainability_category
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

sustainabilities.getAllSustainabilityCategory = async (req, res) => {
  try {
    let data = await sustainability_category.findAll({
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

sustainabilities.addSustainability = async (req, res) => {
  try {
    let { title, sustainabilityId, sort_description, description } = req.body;
    let { userId } = req.body;
    let slug = await utility.generateSlug(title, sustainability);

    let Data = {
      title: title,
      sustainabilityId: sustainabilityId,
      userId: userId,
      description: description,
      sort_description: sort_description,
      slug: slug,
    };
    sustainability
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
};
sustainabilities.getSustainability = async (req, res) => {
  try {
    let data = await sustainability.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: sustainability_category,
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

sustainabilities.editSustainability = async (req, res) => {
  try {
    let { id, title, sustainabilityId, sort_description, description } =
      req.body;
    let { userId } = req.body;
    sustainability
      .findOne({
        where: {
          id: id,
          status: true,
        },
      })
      .then(async (result) => {
        if (result) {
          let slug = await utility.generateSlug(title, sustainability);
          let Data = {
            title: title,
            sustainabilityId: sustainabilityId,
            sort_description: sort_description,
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

sustainabilities.deleteSustainability = async (req, res) => {
  try {
    let { id } = req.body;
    sustainability
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

sustainabilities.getSustainabilityByCategory = async (req, res) => {
  try {
    let { slug } = req.body;
    let data = await sustainability_category.findOne({
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
          model: sustainability,
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

sustainabilities.getSustainabilityBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    sustainability
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
        include: [
          {
            model: sustainability_category,
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

module.exports = sustainabilities;
