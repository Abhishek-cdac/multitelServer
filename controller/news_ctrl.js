"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const news_category = db.news_category;
const news = db.news;
const path = require("path");
const { Op, sequelize } = require("sequelize");

let News = {};

News.addNewsCategory = async (req, res) => {
  try {
    let { name, userId } = req.body;
    let slug = await utility.generateSlug(name, news_category);
    let Data = {
      name: name,
      userId: userId,
      slug: slug,
    };
    console.log(Data);
    let result = await news_category.create(Data);
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

News.editNewsCategory = async (req, res) => {
  try {
    let { id, name } = req.body;
    let { userId } = req.body;
    let Data = {
      name: name,
      userId: userId,
    };

    news_category
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

News.deleteNewsCategory = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.body;
    news_category
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

News.getAllNewsCategory = async (req, res) => {
  try {
    let data = await news_category.findAll({
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

News.addNews = async (req, res) => {
  try {
    let { title, description, categoryId, news_date, news_number } = req.body;
    let { userId } = req.body;
    let slug = await utility.generateSlug(title, news);
    let Data = {
      title: title,
      userId: userId,
      description: description,
      categoryId: categoryId,
      news_date: news_date,
      news_number: news_number,
      slug: slug,
    };
    console.log(Data);
    let result = await news.create(Data);
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

News.getNewsByCategory = async (req, res) => {
  try {
    let { slug } = req.body;
    let data = await news_category.findOne({
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
          model: news,
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

News.getAllNews = async (req, res) => {
  try {
    let data = await news.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: news_category,
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

News.getNewsBySlug = async (req, res) => {
  try {
    let { slug } = req.body;
    let data = await news.findOne({
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
          model: news_category,
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

News.editNews = async (req, res) => {
  try {
    let { id, title, description, categoryId, news_date, news_number, userId } =
      req.body;

    news
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
            categoryId: categoryId,
            news_date: news_date,
            news_number: news_number,
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

News.deleteNews = async (req, res) => {
  try {
    let { id } = req.body;
    news
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
module.exports = News;
