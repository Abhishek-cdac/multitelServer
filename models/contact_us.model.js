module.exports = (sequelize, Sequelize) => {
  const contact_us = sequelize.define(
    "contact_us",
    {
      name: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      subject: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.TEXT,
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

  return contact_us;
};
