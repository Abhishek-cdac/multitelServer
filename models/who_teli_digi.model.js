module.exports = (sequelize, Sequelize) => {
  const who_teli_digi = sequelize.define(
    "who_teli_digi",
    {
      title: {
        type: Sequelize.STRING,
      },
      sub_description: {
        type: Sequelize.TEXT,
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

  return who_teli_digi;
};
