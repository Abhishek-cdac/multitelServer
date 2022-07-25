"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const contact_us = db.contact_us;
const mailer = require("../lib/mailer");
const { Op, sequelize } = require("sequelize");

const contact = {};

contact.addContactUs = async (req, res) => {
  try {
    let { name, country, email, subject, message } = req.body;
    //let slug = await utility.generateSlug(name, contact_us);
    let Data = {
      name: name,
      country: country,
      email: email,
      subject: subject,
      message: message,

      //slug: slug,
    };
    console.log(Data);
    let result = await contact_us.create(Data);
    if (result) {
      let mailOptions = {
        from: "Geeta <geeta.kori@nectarinfotel.com>",
        to: Data.email,
        subject: "Multitel",
        html:
          "<h2>Contact Us <h2>" +
          "<h3 style=color:blue; >Name: <h3>" +
          Data.name +
          "<h3 style=color:blue; >Country: <h3>" +
          Data.country +
          "<h3 style=color:blue; >Email: <h3>" +
          Data.email +
          "<h3 style=color:blue; >Subject: <h3>" +
          Data.subject +
          "<h3 style=color:blue; >Message: <h3>" +
          Data.message,
      };
      await mailer.sendEmail(mailOptions);
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

contact.deleteContactUs = async (req, res) => {
  try {
    let { id } = req.body;
    contact_us
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

contact.getAllContactUs = async (req, res) => {
  try {
    let data = await contact_us.findAll({
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
module.exports = contact;
