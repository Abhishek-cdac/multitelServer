"use strict";

const Constant = require("../config/constant");
const db = require("../models");
const cartdata = db.cart
const product = db.products
const favcart = db.favCartData

let cart ={}
  
cart.addCart = async (req, res) => {
    try {
      let {id,quantity,userId} = req.body;
      let CartData = {
        userId:userId,
        productId:id,
        quantity:quantity,
      };
  
      cartdata.create(CartData)
      .then(async (result) => {
      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.CART_SAVE_SUCCESS,
        data: result,
      })
    }).catch((error) => {
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

cart.getCartData = async(req,res)=>{
    try {
        let {userId} = req.body
        let data = await cartdata.findAll({
          include:[{
            model: product,
          }],
          where: {
            userId:userId,
            status:true
          }
        });
        let massage =
          data.length > 0
            ? Constant.CART_RETRIEVE_SUCCESS
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

  }

cart.cartDataDelete = async (req, res) => {
    try {
      let { id ,userId} = req.body;
      cartdata
        .findOne({
          where: {
            userId: userId,
            productId:id,
            status: 1,
          },
        })
        .then(async (result) => {
          if (result) {
            let cartData = {
              status: 0,
            };
            result.update(cartData);
  
            return res.status(Constant.SUCCESS_CODE).json({
              code: Constant.SUCCESS_CODE,
              massage: Constant.CART_DATA_DELETED_SUCCESS,
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

  
cart.addFavCart = async (req,res)=>{
  try {
    let {id,userId} = req.body;
    let favCartData = {
      userId:userId,
      productId:id,
    };

    favcart.create(favCartData)
    .then(async (result) => {
    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: Constant.CART_SAVE_SUCCESS,
      data: result,
    })
  }).catch((error) => {
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
}

cart.getFavCartData = async(req,res)=>{
  try {
      let { userId } = req.body
      let data = await favcart.findAll({
        include:[{
          model: product,
        }],
        where: {
          userId:userId,
          status:true
        }
      });
      let massage =
        data.length > 0
          ? Constant.CART_RETRIEVE_SUCCESS
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

}

cart.favCartDataDelete = async (req, res) => {
  try {
    let { id,userId } = req.body;
    favcart
      .findOne({
        where: {
          userId: userId,
          productId:id,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let cartData = {
            status: 0,
          };
          result.update(cartData);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.CART_DATA_DELETED_SUCCESS,
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
module.exports = cart;
  