module.exports = (sequelize, Sequelize) => {
  const message_tag = sequelize.define(
    "message_tag",
    {
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return message_tag;
};
