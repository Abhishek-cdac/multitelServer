const dbConfig = require("../config/db.config");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./user.model.js")(sequelize, Sequelize);
db.product_category = require("./product_category.model")(sequelize, Sequelize);
db.products = require("./products.model")(sequelize, Sequelize);
db.Promotion_tag_relationship = require("./Promotion_tag_relationship.model")(
  sequelize,
  Sequelize
);
db.promotion_tag = require("./promotion_tag.model")(sequelize, Sequelize);
db.promotion = require("./promotion.model")(sequelize, Sequelize);
db.service = require("./service.model")(sequelize, Sequelize);
db.service_products = require("./service_products.model")(sequelize, Sequelize);
db.cms = require("./cms.model")(sequelize, Sequelize);
db.vendor = require("./vendor.model")(sequelize, Sequelize);

db.order = require("./order.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize);
db.favCartData = require("./Fav_cart.model")(sequelize, Sequelize);
db.message_mission_sustainability =
  require("./message_mission_sustainability.model")(sequelize, Sequelize);
db.message_tag_relationship = require("./message_tag_relationship.model")(
  sequelize,
  Sequelize
);
db.message_tag = require("./message_tag.model")(sequelize, Sequelize);
db.sustainability_category = require("./sustainability_category.model")(
  sequelize,
  Sequelize
);
db.sustainability = require("./sustainability.model")(sequelize, Sequelize);
db.multitel_pride = require("./multitel_pride.model")(sequelize, Sequelize);
db.multitel_pride_image = require("./multitel_pride_image.model")(
  sequelize,
  Sequelize
);

db.admin.hasMany(db.order, {
  foreignKey: "userId",
});
db.order.belongsTo(db.admin, {
  foreignKey: "userId",
});

db.admin.hasMany(db.vendor, {
  foreignKey: "userId",
});
db.vendor.belongsTo(db.admin, {
  foreignKey: "userId",
});

db.service.hasMany(db.service_products, {
  foreignKey: "serviceId",
});
db.service_products.belongsTo(db.service, {
  foreignKey: "serviceId",
});

db.product_category.hasMany(db.products, {
  foreignKey: "categoryId",
});
db.products.belongsTo(db.product_category, {
  foreignKey: "categoryId",
});

db.admin.hasMany(db.products, {
  foreignKey: "userId",
});
db.products.belongsTo(db.admin, {
  foreignKey: "userId",
});

db.promotion.belongsToMany(db.promotion_tag, {
  through: "promotion_tag_relationship",
  foreignKey: "promotionId",
});

db.promotion_tag.belongsToMany(db.promotion, {
  through: "promotion_tag_relationship",
  foreignKey: "tagId",
});

db.products.hasMany(db.cart, {
  foreignKey: "productId",
});

db.cart.belongsTo(db.products, {
  foreignKey: "productId",
});

db.products.hasMany(db.favCartData, {
  foreignKey: "productId",
});

db.favCartData.belongsTo(db.products, {
  foreignKey: "productId",
});

db.message_mission_sustainability.belongsToMany(db.message_tag, {
  through: "message_tag_relationship",
  foreignKey: "messageId",
});

db.message_tag.belongsToMany(db.message_mission_sustainability, {
  through: "message_tag_relationship",
  foreignKey: "tagId",
});

db.sustainability_category.hasMany(db.sustainability, {
  foreignKey: "sustainabilityId",
});
db.sustainability.belongsTo(db.sustainability_category, {
  foreignKey: "sustainabilityId",
});

db.multitel_pride.hasMany(db.multitel_pride_image, {
  foreignKey: "title_Id",
});

db.multitel_pride_image.belongsTo(db.multitel_pride, {
  foreignKey: "title_Id",
});
module.exports = db;
