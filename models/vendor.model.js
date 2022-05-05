module.exports = (sequelize, Sequelize) => {
    const Vendors = sequelize.define("vendors", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      gendar: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.TEXT('long')
      },
      state: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER(11)
      },
      userId: {
        type: Sequelize.INTEGER(11)
      },
      profile_img: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
      }
    }, {
      timestamps: true
    });
  
    return Vendors;
  };