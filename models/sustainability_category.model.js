module.exports = (sequelize, Sequelize) => {
  const sustainability_category = sequelize.define(
    "sustainability_category",
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

  return sustainability_category;
};
