"use strict";
var jwt = require("jsonwebtoken");
const config = require("../config");
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const service = db.service;
const service_products = db.service_products;
const { Op, sequelize } = require("sequelize");
const { required } = require("joi");
const moment = require("moment");
let services = {};

services.addService = async (req, res) => {
  try {
    let { name, description, image, title, sort_description } = req.body;
    let { userId } = req.user;
    let cover_img = "";
    let slug = await utility.generateSlug(name, service);
    let Data = {
      name: name,
      userId: userId,
      description: description,
      slug: slug,
      title: title,
      sort_description: sort_description,
    };

    let result = await service.create(Data);
    if (result) {
      if (req.files) {
        cover_img = await utility.fileupload(req.files);

        let userData = {
          image: cover_img,
        };
        result.update(userData);
      }

      let data = await service.findAll({
        where: {
          status: true,
        },
      });

      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.PROMOTION_SAVE_SUCCESS,
        data: data,
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

services.editService = async (req, res) => {
  try {
    let { id, name, title, description } = req.body;
    let { userId } = req.user;
    let Data = {
      name: name,
      title: title,
      description: description,
      userId: userId,
    };

    service
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          if (req.files) {
            let cover_img = await utility.fileupload(req.files);
            Data.image = cover_img;
            let userData = {
              image: cover_img,
            };
            result.update(userData);
          }

          result.update(Data);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.PROMOTION_UPDATED_SUCCESS,
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

services.deleteService = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.user;
    service
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
            massage: Constant.PROMOTION_DELETED_SUCCESS,
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

services.getAllService = async (req, res) => {
  try {
    let data = await service.findAll({
      where: {
        status: true,
      },
    });
    let massage =
      data.length > 0
        ? Constant.PROMOTION_RETRIEVE_SUCCESS
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

services.getServiceBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    service
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
      })
      .then(async (result) => {
        let massage = result
          ? Constant.PROMOTION_RETRIEVE_SUCCESS
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

services.add = async (req, res) => {
  try {
    let { name, service_id, price, description, cover_img } = req.body;
    let { userId } = req.user;
    let slug = await utility.generateSlug(name, service_products);

    let ProductData = {
      name: name,
      serviceId: service_id,
      price: price,
      userId: userId,
      description: description,
      slug: slug,
    };
    service_products
      .create(ProductData)
      .then(async (result) => {
        if (req.files) {
          cover_img = await utility.fileupload(req.files);
          let userData = {
            cover_img: cover_img,
          };
          result.update(userData);
        }

        return res.status(Constant.SUCCESS_CODE).json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.PRODUCT_SAVE_SUCCESS,
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

services.edit = async (req, res) => {
  try {
    let { id, name, category_id, price, description, cover_img } = req.body;
    let { userId } = req.user;
    service_products
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          let slug = await utility.generateSlug(name, service_products);
          let ProductData = {
            name: name,
            categoryId: category_id,
            price: price,
            userId: userId,
            description: description,
            slug: slug,
          };

          result.update(ProductData);
          if (req.files) {
            cover_img = await utility.fileupload(req.files);
            let userData = {
              cover_img: cover_img,
            };
            result.update(userData);
          }
          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.PRODUCT_UPDATE_SUCCESS,
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

services.delete = async (req, res) => {
  try {
    let { id } = req.body;
    service_products
      .findOne({
        where: {
          id: id,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let bookData = {
            status: 0,
          };
          result.update(bookData);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.PRODUCT_DELETED_SUCCESS,
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

services.getProducts = async (req, res) => {
  try {
    let data = await service_products.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: service,
        },
      ],
    });
    let massage =
      data.length > 0
        ? Constant.PRODUCT_RETRIEVE_SUCCESS
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

services.getProductsByCategory = async (req, res) => {
  try {
    let { slug } = req.body;
    let data = await service.findOne({
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
          model: service_products,
          where: {
            status: true,
          },
        },
      ],
    });
    let massage = data
      ? Constant.PRODUCT_RETRIEVE_SUCCESS
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

services.getProductBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    service_products
      .findOne({
        where: {
          slug: slug,
          status: true,
        },
        include: [
          {
            model: service,
            attributes: ["id", "name", "description"],
          },
        ],
      })
      .then(async (result) => {
        let massage = result
          ? Constant.PRODUCT_RETRIEVE_SUCCESS
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
module.exports = services;
