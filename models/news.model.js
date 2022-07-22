module.exports = (sequelize, Sequelize) => {
  const news = sequelize.define(
    "news",
    {
      title: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER(11),
      },
      description: {
        type: Sequelize.TEXT,
      },
      news_date: {
        type: Sequelize.DATE(6),
      },
      news_number: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER(11),
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

  return news;
};
