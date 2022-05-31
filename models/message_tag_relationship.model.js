module.exports = (sequelize, Sequelize) => {
  const message_tag_relationship = sequelize.define(
    "message_tag_relationship",
    {
      messageId: {
        type: Sequelize.INTEGER(11),
      },
      tagId: {
        type: Sequelize.INTEGER(11),
      },
    },
    {
      timestamps: true,
    }
  );

  return message_tag_relationship;
};
