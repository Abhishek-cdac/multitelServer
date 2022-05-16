module.exports = (sequelize, Sequelize) => {
    const cart = sequelize.define(
      "cart",
      {
        userId:{
          type: Sequelize.INTEGER(20),
        },
        quantity: {
          type: Sequelize.INTEGER(100),
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
  
    return cart;
  };
  