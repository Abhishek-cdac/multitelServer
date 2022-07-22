module.exports = (sequelize, Sequelize) => {
  const corporate_category = sequelize.define(
    "corporate_category",
    {
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER(11),
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

  return corporate_category;
};
