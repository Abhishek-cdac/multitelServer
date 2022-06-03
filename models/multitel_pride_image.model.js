module.exports = (sequelize, Sequelize) => {
  const multitel_pride_image = sequelize.define(
    "multitel_pride_image",
    {
      title_Id: {
        type: Sequelize.INTEGER(11),
      },
      image: {
        type: Sequelize.STRING,
      },
      imageName: {
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

  return multitel_pride_image;
};
