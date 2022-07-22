'use strict'
var jwt = require('jsonwebtoken');
const config = require('../config');
const Constant = require('../config/constant');
const db = require("../models");
const utility = require('../helpers/utility');
const promotion_tag = db.promotion_tag;
const Promotion_tag_relationship = db.Promotion_tag_relationship;
const promotion = db.promotion;
const { Op, sequelize } = require("sequelize");
const { required } = require('joi');
const moment = require('moment');
const { store } = require('../models');
let promotions = {};

promotions.addPromotion = async (req, res) => {
    try {

        let { name, description, image , tag } = req.body;
        let { userId } = req.user;
        let cover_img = "";
        let slug = await utility.generateSlug(name, promotion);
        let Data = {
            name: name,
            userId:userId,
            description: description,
            slug: slug
            
        }

        let result = await promotion.create(Data);
        if (result) {
            
            if (tag) {
                let data = await utility.checkTagAndCreate(tag, result.id, promotion_tag, Promotion_tag_relationship);
            }

            if (req.files) {
                cover_img = await utility.fileupload(req.files)
                let userData = {
                    image: cover_img

                }
                result.update(userData)
            }

            let data = await promotion.findAll({
                where: {
                    status: true
                },
include: [{
                model: promotion_tag
            }]
            })

            return res.status(Constant.SUCCESS_CODE).json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.PROMOTION_SAVE_SUCCESS,
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


promotions.editPromotion = async (req, res) => {
    try {

        let { id, name, description ,tag } = req.body;
        let { userId } = req.user;
        let Data = {
            name: name,
            description: description,
            userId:userId,
        }

        promotion.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
               
                if (tag) {
                    let data = await utility.checkTagAndCreate(tag, result.id, promotion_tag, Promotion_tag_relationship);
                }

                
                if (req.files) {

                   let cover_img = await utility.fileupload(req.files)
                    Data.image = cover_img;
                    let userData = {
                        image: cover_img
    
                    }
                    result.update(userData)
                }

                result.update(Data)
    

                return res.status(Constant.SUCCESS_CODE).json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.PROMOTION_UPDATED_SUCCESS,
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


promotions.deletePromotion = async (req, res) => {
    try {

        let { id } = req.body;
        let { userId } = req.user;
        promotion.findOne({
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
                    massage: Constant.PROMOTION_DELETED_SUCCESS,
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


promotions.getAllPromotion = async (req, res) => {
    try {

        let data = await promotion.findAll({
            where: {
                status: true
            },
include: [{
                model: promotion_tag
            }]
        })
        let massage = (data.length > 0) ? Constant.PROMOTION_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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

promotions.getPromotionBySlug = async (req, res) => {
    try {
        let { slug } = req.body;
        promotion.findOne({
            where: {
                slug: slug,
                status: true
            },
            include: [{
                model: promotion_tag
            }]
        }).then(async (result) => {

            let massage = (result) ? Constant.PROMOTION_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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
module.exports = promotions;