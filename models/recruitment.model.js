module.exports = (sequelize, Sequelize) => {
    const recruitment = sequelize.define(
      "recruitment",
      {
        name: {
          type: Sequelize.STRING,
        },
        categoryId: {
          type: Sequelize.INTEGER(11),
        },
        userId: {
          type: Sequelize.INTEGER(11),
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        file: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.TEXT
        },
        recruitment_heading: {
            type: Sequelize.TEXT,
        },
        description_heading: {
            type: Sequelize.TEXT,
        },
        phone: {
            type: Sequelize.INTEGER(11)
        },
        slug: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        sub_description: {
          type: Sequelize.TEXT,
        },
        household: {
            type: Sequelize.TEXT,
        },
        approved: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
  
    return recruitment;
  };
  