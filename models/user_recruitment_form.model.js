module.exports = (sequelize, Sequelize) => {
  const user_recruitment_form = sequelize.define(
    "user_recruitment_form",
    {
      name: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      categoryId: {
        type: Sequelize.INTEGER(11),
      },
      slug: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BIGINT(11),
      },
      email: {
        type: Sequelize.STRING,
      },
      household: {
        type: Sequelize.TEXT,
      },
      file: {
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

  return user_recruitment_form;
};
