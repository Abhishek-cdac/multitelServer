module.exports = (sequelize, Sequelize) => {
    const recruitment_requirement_tag = sequelize.define(
      "recruitment_requirement_tag",
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
  
    return recruitment_requirement_tag;
};
  