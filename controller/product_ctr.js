'use strict'
var jwt = require('jsonwebtoken');
const config = require('../config');
const Constant = require('../config/constant');
const db = require("../models");
const utility = require('../helpers/utility');
const product_category = db.product_category;
const product = db.products;
const { Op, sequelize } = require("sequelize");
const { required } = require('joi');
const moment = require('moment');
const { store } = require('../models');
let products = {};

products.addCategory = async (req, res) => {
    try {

        let { name, description, image } = req.body;
        let { userId } = req.user;
        let cover_img = "";
        let slug = await utility.generateSlug(name, product_category);
        let Data = {
            name: name,
            userId:userId,
            description: description,
            slug: slug
            
        }

        let result = await product_category.create(Data);
        if (result) {

            if (req.files) {

                cover_img = await utility.fileupload(req.files)

                let userData = {
                    image: cover_img

                }
                result.update(userData)
            }

            let data = await product_category.findAll({
                where: {
                    status: true
                }
            })

            return res.status(Constant.SUCCESS_CODE).json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.CATEGORY_SAVE_SUCCESS,
                data: data
            })
        } else {
            return res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: result
            })
        }
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


products.editCategory = async (req, res) => {
    try {

        let { id, name, description } = req.body;
        let { userId } = req.user;
        let Data = {
            name: name,
            description: description,
            userId:userId,
        }

        product_category.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
             result.update(Data)
  	  if (req.files) {

                let cover_img = await utility.fileupload(req.files)

                let userData = {
                    image: cover_img

                }
                result.update(userData)
            }


    

                return res.status(Constant.SUCCESS_CODE).json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.CATEGORY_UPDATED_SUCCESS,
                    data: result
                })

            } else {
                return res.status(Constant.ERROR_CODE).json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


products.deleteCategory = async (req, res) => {
    try {

        let { id } = req.body;
        let { userId } = req.user;
        product_category.findOne({
            where: {
                id: id,
                status: 1
            }
        }).then(async (result) => {
            if (result) {
                let Data = {
                    status: 0,
                    userId:userId

                }
                result.update(Data)

                return res.status(Constant.SUCCESS_CODE).json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.CATEGORY_DELETED_SUCCESS,
                    data: result
                })

            } else {
                return res.status(Constant.ERROR_CODE).json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


products.getAllCategory = async (req, res) => {
    try {

        let data = await product_category.findAll({
            where: {
                status: true
            }
        })
        let massage = (data.length > 0) ? Constant.CATEGORY_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}



products.add = async (req, res) => {

    try {
        let { name, category_id, price, description, cover_img } = req.body;
        let { userId } = req.user;
        let slug = await utility.generateSlug(name, product);

        let ProductData = {
            name: name,
            categoryId: category_id,
            price: price,
            userId: userId,
            description: description,
            slug: slug
        }
        product.create(ProductData).then(async result => {

            if (req.files) {
                cover_img = await utility.fileupload(req.files)
                let userData = {
                    cover_img: cover_img

                }
                result.update(userData)
            }

            return res.status(Constant.SUCCESS_CODE).json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.PRODUCT_SAVE_SUCCESS,
                data: result
            })
        }).catch(error => {

            return res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: result
            })
        })
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


products.edit = async (req, res) => {
    try {

        let { id, name, category_id, price, description, cover_img} = req.body;
        let { userId } = req.user;
        product.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let slug = await utility.generateSlug(name, product);
                let ProductData = {
                    name: name,
                    categoryId: category_id,
                    price: price,
                    userId: userId,
                    description: description,
                    slug: slug
                }

               result.update(ProductData);
                if (req.files) {
                    cover_img = await utility.fileupload(req.files)
                    let userData = {
                        cover_img: cover_img

                    }
                    result.update(userData)
                }
                return res.status(Constant.SUCCESS_CODE).json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.PRODUCT_UPDATE_SUCCESS,
                    data: result
                })

            } else {
                return res.status(Constant.ERROR_CODE).json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: null
                })
            }

        }).catch(error => {
            return res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


products.delete = async (req, res) => {
    try {

        let { id } = req.body;
        product.findOne({
            where: {
                id: id,
                status: 1
            }
        }).then(async (result) => {
            if (result) {
                let bookData = {
                    status: 0

                }
                result.update(bookData)

                return  res.status(Constant.SUCCESS_CODE).json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.PRODUCT_DELETED_SUCCESS,
                    data: result
                })

            } else {
                return  res.status(Constant.ERROR_CODE).json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return  res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return  res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


products.getProducts = async (req, res) => {
    try {

        let data = await product.findAll({
            where: {
                status: true
            },
            include: [{
                model: product_category
            }
         ],
           
        })
        let massage = (data.length > 0) ? Constant.PRODUCT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

products.getProductsByCategory = async (req, res) => {
    try {
        let { slug } = req.body;
        let data = await product_category.findOne({
            where: {
                status: true,
                [Op.or]: [
                    {
                        slug: slug
                    },
                ]

            },
            include: [{
                model: product,
                where: {
                    status: true
                }
            }]
        })
        let massage = (data) ? Constant.PRODUCT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
        return  res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: massage,
            data: data
        })
    } catch (error) {
        return  res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

products.getProductBySlug = async (req, res) => {
    try {
        let { slug } = req.body;
        product.findOne({
            where: {
                slug: slug,
                status: true
            },
            include: [{
                model: product_category,
                attributes: ["id", "name", "description"]
            }]
        }).then(async (result) => {

            let massage = (result) ? Constant.PRODUCT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.status(Constant.SUCCESS_CODE).json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: result
            })
        }).catch(error => {
            return res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}
products.getLatestProducts = async (req, res) => {
    try {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        product.findAll({
            limit: 12,            
            where: {
                createdAt: {
                    [Op.gte]: date
                   },
                status: true
            },
            include: [{
                model: product_category,
                attributes: ["id", "name", "description"]
            }]
        }).then(async (result) => {
            if(result.length){
                let massage = (result) ? Constant.PRODUCT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
                return res.status(Constant.SUCCESS_CODE).json({
                        code: Constant.SUCCESS_CODE,
                        massage: massage,
                        data: result
                    })
            }else{
                product.findAll({
                    limit: 12,
                    where: {
                        status: true,
                    },
                    include: [{
                        model: product_category,
                        attributes: ["id", "name", "description"]
                    }],
                    order: [
                        ['id', 'DESC']
                    ]
                }).then(async (result1) => {
                    let massage = (result1) ? Constant.PRODUCT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
                return res.status(Constant.SUCCESS_CODE).json({
                        code: Constant.SUCCESS_CODE,
                        massage: "massage",
                        data: result1
                    })
                }).catch(error => {
                    return res.status(Constant.ERROR_CODE).json({
                        code: Constant.ERROR_CODE,
                        massage: Constant.SOMETHING_WENT_WRONG,
                        data: error
                    })
                })
            }
            
        }).catch(error => {
            return res.status(Constant.ERROR_CODE).json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}
module.exports = products;