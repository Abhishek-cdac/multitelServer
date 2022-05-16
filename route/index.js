const express = require('express');
const app = express();

var user = require('./user');
var product = require('./product');
var promotion = require('./promotion');
var service = require('./service');
var cms = require('./cms');
var vendor = require('./vendor');
var payment = require('./payment');
var cart = require('./cart')
// user route file
app.use('/user', user);
app.use('/product', product);
app.use('/promotion', promotion);
app.use('/service', service);
app.use('/cms', cms);
app.use('/vendor', vendor);
app.use('/payment', payment);
app.use('/cart',cart)
module.exports = app;