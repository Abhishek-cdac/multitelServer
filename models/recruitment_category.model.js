module.exports = (sequelize, Sequelize) => {
    const recruitment_category = sequelize.define(
      "recruitment_category",
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
  
    return recruitment_category;
  };
  