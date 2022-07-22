module.exports = (sequelize, Sequelize) => {
    const recruitment_requirement_tag_relationship = sequelize.define("recruitment_requirement_tag_relationship", {
      messageId: {
        type: Sequelize.INTEGER(11)
      },
      tagId: {
        type: Sequelize.INTEGER(11)
      },
    }, {
      timestamps: true
    });
  
    return recruitment_requirement_tag_relationship;
  };