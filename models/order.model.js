module.exports = (sequelize, Sequelize) => {
    const orders = sequelize.define("order", {
     amount: {
        type: Sequelize.STRING
      },
      custom_fields: {
        type: Sequelize.TEXT
      },
      datetime:{
        type: Sequelize.STRING
      },
      entity_id:{
        type: Sequelize.INTEGER 
      },
      payment_id: {
        type: Sequelize.TEXT
      },
      period_end_datetime: {
        type: Sequelize.TEXT
      },
      period_start_datetime: {
        type: Sequelize.TEXT
      },
      reference_id: {
        type: Sequelize.TEXT
      },
      terminal_id: {
        type: Sequelize.TEXT
      },
      terminal_location: {
        type: Sequelize.TEXT
      },
      terminal_type: {
        type: Sequelize.TEXT
      },
      transaction_id:{
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER(11)
      },
      order_detail: {
        type: Sequelize.TEXT
      }
    },
      {
        timestamps: true
      });
  
    return orders;
  };