var express = require("express");
var router = express.Router();
var cart = require("../controller/cart_ctrl");
const middileware = require("../middileware");

router.post("/addcartdata", middileware.checkAuthentication, cart.addCart);
router.post("/getCartData", middileware.checkAuthentication, cart.getCartData);
router.delete(
  "/cartDataDelete",
  middileware.checkAuthentication,
  cart.cartDataDelete
);
router.put(
  "/updateCartData",
  middileware.checkAuthentication,
  cart.updateCartData
);

router.post("/addFavCart", middileware.checkAuthentication, cart.addFavCart);
router.post(
  "/getFavCartData",
  middileware.checkAuthentication,
  cart.getFavCartData
);
router.delete(
  "/favCartDataDelete",
  middileware.checkAuthentication,
  cart.favCartDataDelete
);
module.exports = router;
