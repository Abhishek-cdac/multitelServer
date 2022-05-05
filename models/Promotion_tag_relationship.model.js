module.exports = (sequelize, Sequelize) => {
  const Promotion_tag_relationship = sequelize.define("promotion_tag_relationship", {
    promotionId: {
      type: Sequelize.INTEGER(11)
    },
    tagId: {
      type: Sequelize.INTEGER(11)
    }
  }, {
    timestamps: true
  });

  return Promotion_tag_relationship;
};