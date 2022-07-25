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
db.corporate_category = require("./corporate_category.model")(
  sequelize,
  Sequelize
);
db.corporate = require("./corporate.model")(sequelize, Sequelize);
db.news_category = require("./news_category.model")(sequelize, Sequelize);
db.news = require("./news.model")(sequelize, Sequelize);
db.recruitment_category = require("./recruitment_category.model")(
  sequelize,
  Sequelize
);
db.recruitment = require("./recruitment.model")(sequelize, Sequelize);
db.recruitment_requirement_tag_relationship =
  require("./recruitment_requirement_tag_relationship.model")(
    sequelize,
    Sequelize
  );
db.recruitment_requirement_tag = require("./recruitment_requirement_tag.model")(
  sequelize,
  Sequelize
);
db.recruitment_description_tag = require("./recruitment_description_tag.model")(
  sequelize,
  Sequelize
);
db.recruitment_description_tag_relationship =
  require("./recruitment_description_tag_relationship.model")(
    sequelize,
    Sequelize
  );
db.user_recruitment_form = require("./user_recruitment_form.model")(
  sequelize,
  Sequelize
);
db.who_teli_digi = require("./who_teli_digi.model")(sequelize, Sequelize);
db.telecommunication_submenus = require("./telecommunication_submenus.model")(
  sequelize,
  Sequelize
);
db.telecommunication = require("./telecommunication.model")(
  sequelize,
  Sequelize
);
db.digitotal = require("./digitotal.model")(sequelize, Sequelize);
db.contact_us = require("./contact_us.model")(sequelize, Sequelize);
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

db.corporate_category.hasMany(db.corporate, {
  foreignKey: "corporateId",
});

db.corporate.belongsTo(db.corporate_category, {
  foreignKey: "corporateId",
});

db.news_category.hasMany(db.news, {
  foreignKey: "categoryId",
});

db.news.belongsTo(db.news_category, {
  foreignKey: "categoryId",
});

db.recruitment_category.hasMany(db.recruitment, {
  foreignKey: "categoryId",
});

db.recruitment.belongsTo(db.recruitment_category, {
  foreignKey: "categoryId",
});

db.recruitment.belongsToMany(db.recruitment_requirement_tag, {
  through: "recruitment_requirement_tag_relationship",
  foreignKey: "messageId",
});

db.recruitment_requirement_tag.belongsToMany(db.recruitment, {
  through: "recruitment_requirement_tag_relationship",
  foreignKey: "tagId",
});

db.recruitment.belongsToMany(db.recruitment_description_tag, {
  through: "recruitment_description_tag_relationship",
  foreignKey: "messageId",
});

db.recruitment_description_tag.belongsToMany(db.recruitment, {
  through: "recruitment_description_tag_relationship",
  foreignKey: "tagId",
});

db.recruitment_category.hasMany(db.user_recruitment_form, {
  foreignKey: "categoryId",
});
db.user_recruitment_form.belongsTo(db.recruitment_category, {
  foreignKey: "categoryId",
});
db.telecommunication_submenus.hasMany(db.telecommunication, {
  foreignKey: "category_id",
});
db.telecommunication.belongsTo(db.telecommunication_submenus, {
  foreignKey: "category_id",
});
module.exports = db;
