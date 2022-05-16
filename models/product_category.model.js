module.exports = (sequelize, Sequelize) => {
  const product_category = sequelize.define(
    "product_category",
    {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      slug: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return product_category;
};
