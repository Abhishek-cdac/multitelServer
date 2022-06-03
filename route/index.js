const express = require("express");
const app = express();

var user = require("./user");
var product = require("./product");
var promotion = require("./promotion");
var service = require("./service");
var cms = require("./cms");
var vendor = require("./vendor");
var payment = require("./payment");
var cart = require("./cart");
var message_mission_sustainability = require("./message_mission_sustainability");
var sustainability_category = require("./sustainability_category");
var multitel_Pride = require("./multitel_pride");
// user route file
app.use("/user", user);
app.use("/product", product);
app.use("/promotion", promotion);
app.use("/service", service);
app.use("/cms", cms);
app.use("/vendor", vendor);
app.use("/payment", payment);
app.use("/cart", cart);
app.use("/msgMissionSus", message_mission_sustainability);
app.use("/sustainability", sustainability_category);
app.use("/multitelPride", multitel_Pride);
module.exports = app;
