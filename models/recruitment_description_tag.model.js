module.exports = (sequelize, Sequelize) => {
    const recruitment_description_tag = sequelize.define(
      "recruitment_description_tag",
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
  
    return recruitment_description_tag;
};
  