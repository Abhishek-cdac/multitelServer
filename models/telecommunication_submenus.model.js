module.exports = (sequelize, Sequelize) => {
  const telecommunication_submenus = sequelize.define(
    "telecommunication_submenus",
    {
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      image: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
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

  return telecommunication_submenus;
};
