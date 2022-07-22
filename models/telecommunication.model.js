module.exports = (sequelize, Sequelize) => {
  const telecommunication = sequelize.define(
    "telecommunication",
    {
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      category_id: {
        type: Sequelize.INTEGER(11),
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
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

  return telecommunication;
};
