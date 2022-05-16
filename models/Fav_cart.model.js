module.exports = (sequelize, Sequelize) => {
    const favCartData = sequelize.define(
      "favCartData",
      {
        userId:{
          type: Sequelize.INTEGER(20),
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
  
    return favCartData;
  };
  