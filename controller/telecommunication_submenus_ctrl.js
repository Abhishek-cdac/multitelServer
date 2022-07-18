"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const telecommunication_submenus = db.telecommunication_submenus;
const telecommnication = db.telecommunication;
const { Op, sequelize } = require("sequelize");

const telecommnications = {};

telecommnications.addTelecommunicationMenus = async (req, res) => {
  try {
    let { name, description } = req.body;
    let { userId } = req.body;
    if (req.files) {
      console.log(req.files);
      var filename = await utility.fileupload(req.files);
    }
    let slug = await utility.generateSlug(name, telecommunication_submenus);
    let Data = {
      name: name,
      userId: userId,
      description: description,
      slug: slug,
      image: filename,
    };
    let result = await telecommunication_submenus.create(Data);
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

telecommnications.getTelecommunicationMenusBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    telecommunication_submenus
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

telecommnications.getAllTelecommnicationMenus = async (req, res) => {
  try {
    let data = await telecommunication_submenus.findAll({
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

telecommnications.editTelecommunicatiosMenus = async (req, res) => {
  try {
    let { id, name, description } = req.body;
    let { userId } = req.body;
    if (req.files) {
      console.log(req.files);
      var filename = await utility.fileupload(req.files);
    }
    let Data = {
      name: name,
      userId: userId,
      description: description,
      image: filename,
    };
    telecommunication_submenus
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

telecommnications.deleteTelecommunicationMenus = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.body;
    telecommunication_submenus
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

telecommnications.addTelecommunication = async (req, res) => {
  try {
    let { name, description, category_id } = req.body;
    let { userId } = req.body;
    let slug = await utility.generateSlug(name, telecommnication);
    if (req.files) {
      console.log(req.files);
      var filename = await utility.fileupload(req.files);
    }
    let Data = {
      name: name,
      userId: userId,
      category_id: category_id,
      description: description,
      slug: slug,
      image: filename,
    };
    let result = await telecommnication.create(Data);
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

telecommnications.getTelecommunicationByCategory = async (req, res) => {
  try {
    let { slug } = req.body;
    telecommunication_submenus
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
        include: [
          {
            model: telecommnication,
	    where: {
              status: true,
            },
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

telecommnications.getTelecommunicationBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    telecommnication
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
        include: [
          {
            model: telecommunication_submenus,
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

telecommnications.getAllTelecommnication = async (req, res) => {
  try {
    let data = await telecommnication.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: telecommunication_submenus,
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

telecommnications.editTelecommunication = async (req, res) => {
  try {
    let { id, name, description, category_id } = req.body;
    let { userId } = req.body;
    if (req.files) {
      var filename = await utility.fileupload(req.files);
    }
    let Data = {
      name: name,
      userId: userId,
      category_id: category_id,
      description: description,
      image: filename,
    };
    telecommnication
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
telecommnications.deleteTelecommunication = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.body;
    telecommnication
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
module.exports = telecommnications;
