module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define(
    "products",
    {
      name: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER(11),
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      quantity: {
        type: Sequelize.INTEGER(100),
      },
      price: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      cover_img: {
        type: Sequelize.TEXT,
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return products;
};
