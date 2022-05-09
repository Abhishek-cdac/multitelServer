const db = require("../models");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Op = db.Sequelize.Op;
const order = db.order;
const Constant = require('../config/constant');
const utility = require('../helpers/utility');
const axios = require('axios');
const mailer = require('../lib/mailer');
var cron = require('node-cron');
let payments = {};


payments.createRefrenceId = async (req,res) => {

  try {
    let requestData = req.body;
    let reference_id = utility.randomRefrenceId(9);

  let referenceData = {
    amount: requestData.amount,
    end_datetime: requestData.end_datetime,
    custom_fields: requestData.custom_fields,
  }

    var data = JSON.stringify(referenceData);
    var config = {
      method: 'put',
      url: 'https://api.sandbox.proxypay.co.ao/references/'+reference_id,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Token q18jo4ecg49n555i0nvapakh1idqeugq', 
        'Accept': 'application/vnd.proxypay.v2+json'
      },
      data : data
    };
    
    axios(config)
    .then(async function (response) {

      let mailOptions = {
        from: 'vikas <vikas.kushwah@nectarinfotel.com>',
        to: requestData.custom_fields.email,
        subject: 'multitel',
        text: 'payment referenceID ',
        html: '<h1>payment referenceID<h1>: ' + reference_id +'</a>'
      }
      await mailer.sendEmail(mailOptions);

      requestData.order_detail = JSON.stringify(requestData.order_detail);
      requestData.custom_fields = JSON.stringify(requestData.custom_fields);
      requestData.reference_id = reference_id;
      let result = await order.create(requestData);

      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        data: result
      })
    })
    .catch(function (error) {
      return res.status(Constant.ERROR_CODE).json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: error
      })
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error
    })
  }
  } 


payments.createPayment = async (req,res) => {

    try {
      let requestData = req.body;
      order.findOne({
        where: {
          reference_id: requestData.reference_id
        }
    }).then(async (result) => {
        if(result){
          requestData.custom_fields = JSON.stringify(requestData.custom_fields);

          result.update(requestData);
          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.PAYMENT_UPDATED_SUCCESS,
            data: result
        })
        }else{
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result
        })
        }
    }).catch((error)=>{
      return res.status(Constant.ERROR_CODE).json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: result
      })
    });
    } catch (error) {
      return res.status(Constant.ERROR_CODE).json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: error
      })
    }
    } 
payments.getAllPayment = async (req,res) => {
try {
  var config = {
    method: 'get',
    url: 'https://api.sandbox.proxypay.co.ao/payments',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Token q18jo4ecg49n555i0nvapakh1idqeugq', 
      'Accept': 'application/vnd.proxypay.v2+json'
    }
  };
  
  axios(config)
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    res.json(error)
  });
} catch (error) {
  res.json(error)
}
}

updatePaymentData = async () => {
  try {
    var config = {
      method: 'get',
      url: 'https://api.sandbox.proxypay.co.ao/payments',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Token q18jo4ecg49n555i0nvapakh1idqeugq', 
        'Accept': 'application/vnd.proxypay.v2+json'
      }
    };
    
    axios(config)
    .then(function (response) {
      let result = response.data;
      
      result.forEach(element => {
        console.log('element');
        console.log(element.reference_id);
        order.findOne({
          where: {
            reference_id: element.reference_id
          }
      }).then((resultData) => {

        if(resultData){
      
          element.custom_fields = JSON.stringify(element.custom_fields);
           element.payment_id = element.id;
           console.log('element');
           console.log(element);
           resultData.update(element);

           var config = {
            method: 'DELETE',
            url: 'https://api.sandbox.proxypay.co.ao/payments/'+element.id,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Token q18jo4ecg49n555i0nvapakh1idqeugq', 
              'Accept': 'application/vnd.proxypay.v2+json'
            }
          };
          axios(config)
          .then(function (response) {
            console.log('DELETE')
          })
          .catch(function (error) {
            console.log(error)
          });

           
        }else{
          var config = {
            method: 'DELETE',
            url: 'https://api.sandbox.proxypay.co.ao/payments/'+element.id,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Token q18jo4ecg49n555i0nvapakh1idqeugq', 
              'Accept': 'application/vnd.proxypay.v2+json'
            }
          };
          axios(config)
          .then(function (response) {
            console.log('DELETE')
          })
          .catch(function (error) {
            console.log(error)
          });
        }
      })
      });
    })
    .catch(function (error) {
      console.log(error)
    });
  } catch (error) {
    console.log(error)
  }
  }
cron.schedule('*/30 * * * *', () => {
  updatePaymentData();
  console.log('running a task every minute');
});


payments.getOrderDetails = async (req,res) => {
  try {
    let userId = req.body.userId;
    let data = await order.findAll({
        where: {
          userId: userId
        }
    })
    let massage = (data.length > 0) ? Constant.PAYMENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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

  payments.getAdminOrderDetails = async (req,res) => {
    try {
      let userId = req.body.userId;
      let data = await order.findAll({})
      let massage = (data.length > 0) ? Constant.PAYMENT_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
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
module.exports = payments;