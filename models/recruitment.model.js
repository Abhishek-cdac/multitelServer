module.exports = (sequelize, Sequelize) => {
  const recruitment = sequelize.define(
    "recruitment",
    {
      categoryId: {
        type: Sequelize.INTEGER(11),
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      image: {
        type: Sequelize.STRING,
      },
      recruitment_heading: {
        type: Sequelize.TEXT,
      },
      description_heading: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      sub_description: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE(6),
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
      timestamps: true,
    }
  );

  return recruitment;
};
