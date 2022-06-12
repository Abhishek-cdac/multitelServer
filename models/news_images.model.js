module.exports = (sequelize, Sequelize) => {
    const news_image = sequelize.define(
      "news_image",
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
  
    return news_image;
  };
  