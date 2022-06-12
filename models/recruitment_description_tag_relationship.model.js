module.exports = (sequelize, Sequelize) => {
    const recruitment_description_tag_relationship = sequelize.define("recruitment_description_tag_relationship", {
      messageId: {
        type: Sequelize.INTEGER(11)
      },
      tagId: {
        type: Sequelize.INTEGER(11)
      },
    }, {
      timestamps: true
    });
  
    return recruitment_description_tag_relationship;
  };