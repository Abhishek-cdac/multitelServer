module.exports = (sequelize, Sequelize) => {
    const news_category = sequelize.define(
      "news_category",
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
  
    return news_category;
  };
  