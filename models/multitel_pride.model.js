module.exports = (sequelize, Sequelize) => {
  const multitel_pride = sequelize.define(
    "multitel_pride",
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      sort_description: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      slug: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.JSON,
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

  return multitel_pride;
};
