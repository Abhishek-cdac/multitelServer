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
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./user.model.js")(sequelize, Sequelize);
db.product_category = require("./product_category.model")(sequelize, Sequelize);
db.products = require("./products.model")(sequelize, Sequelize);
db.Promotion_tag_relationship = require("./Promotion_tag_relationship.model")(sequelize, Sequelize);
db.promotion_tag = require("./promotion_tag.model")(sequelize, Sequelize);
db.promotion = require("./promotion.model")(sequelize, Sequelize);
db.service = require("./service.model")(sequelize, Sequelize);
db.service_products = require("./service_products.model")(sequelize, Sequelize);
db.cms = require("./cms.model")(sequelize, Sequelize);
db.vendor = require("./vendor.model")(sequelize, Sequelize);

db.order = require("./order.model")(sequelize, Sequelize);


db.admin.hasMany(db.order, {
  foreignKey: "userId"
})
db.order.belongsTo(db.admin, {
  foreignKey: "userId"
})

db.admin.hasMany(db.vendor, {
  foreignKey: "userId"
})
db.vendor.belongsTo(db.admin, {
  foreignKey: "userId"
})

db.service.hasMany(db.service_products, {
  foreignKey: "serviceId"
})
db.service_products.belongsTo(db.service, {
  foreignKey: "serviceId"
})


db.product_category.hasMany(db.products, {
  foreignKey: "categoryId"
})
db.products.belongsTo(db.product_category, {
  foreignKey: "categoryId"
})

db.admin.hasMany(db.products, {
  foreignKey: "userId"
})
db.products.belongsTo(db.admin, {
  foreignKey: "userId"
})


db.promotion.belongsToMany(db.promotion_tag, {
  through: "promotion_tag_relationship",
  foreignKey: "promotionId",
});

db.promotion_tag.belongsToMany(db.promotion, {
  through: "promotion_tag_relationship",
  foreignKey: "tagId",
});


module.exports = db;