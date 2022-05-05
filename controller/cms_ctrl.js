const db = require("../models");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const cms = db.cms;
const Op = db.Sequelize.Op;
const Constant = require('../config/constant')
const utility = require('../helpers/utility')
let cmsfunc = {};
cmsfunc.add = async (req, res) => {
    try {
        let { title, image, link, subtitle, description, name, button, page_slug} = req.body;
        let cmsData = {
            title: title,
            page_slug:page_slug,
            name:name,
            link: link,
            subtitle: subtitle,
            description: description,
            button:button
        }

        let result = await cms.create(cmsData);
        if (req.files) {
            image = await await utility.fileupload(req.files);

            let userData = {
                image: image
            }
            result.update(userData)
        }
        return res.json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.SLIDE_SAVE_SUCCESS,
            data: result
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


cmsfunc.edit = async (req, res) => {
    try {
        let { id, title, image, link, subtitle, description, name, button, page_slug } = req.body;
       
        cms.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (req.files) {
                image = await await utility.fileupload(req.files);

                let cmsData = {
                    title: title,
                    page_slug:page_slug,
                    name:name,
                    link: link,
                    subtitle: subtitle,
                    description: description,
                    button:button,
                    image: image
                }
                result.update(cmsData)
            } else {
                let cmsData = {
                    title: title,
                    page_slug:page_slug,
                    name:name,
                    link: link,
                    subtitle: subtitle,
                    description: description,
                    button:button
                }
                result.update(cmsData)
            }
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_SAVE_SUCCESS,
                data: result
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: null
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null
        })
    }

}


cmsfunc.deletecms = async (req, res) => {
    try {

        let { id } = req.body;

        cms.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                let cmsData = {
                    status: 0

                }
                result.update(cmsData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.SLIDE_DELETED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }
}


cmsfunc.getAllCms = async (req, res) => {
    try {
        let { search} = req.body;
        let condition = {
            status: true
        }
        if (search) {
            condition = {
                [Op.or]: {
                    title: {
                        [Op.like]: `%${search}%`
                    },
                    link: {
                        [Op.like]: `%${search}%`
                    },
                    subtitle: {
                        [Op.like]: `%${search}%`
                    },
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }
            }
        }

        cms.findAll({
            where: condition
        }).then(async (result) => {
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_RETRIEVE_SUCCESS,
                data: result
            })

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }
}

cmsfunc.getAllAprovedCms = async (req, res) => {
    try {
       
        let { page_slug} = req.body;
        let condition = {
            status: true,
            approved: true
        }
        
        if(page_slug){
            condition = {
                status: true,
                approved: true,
                page_slug:page_slug
            }
        }
        cms.findAll({
            where: condition
        }).then(async (result) => {
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_RETRIEVE_SUCCESS,
                data: result
            })

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }
}


cmsfunc.cmsAprovedStatus = async (req, res) => {
    try {
        let { id, approved } = req.body;
        cms.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {

            let cmsData = {
                approved: approved
            }
            result.update(cmsData)
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.SLIDE_UPDATE_SUCCESS,
                data: result
            })
        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: null
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null
        })
    }

}
module.exports = cmsfunc;