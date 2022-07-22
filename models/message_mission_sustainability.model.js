module.exports = (sequelize, Sequelize) => {
  const message_mission_sustainability = sequelize.define(
    "message_mission_sustainability",
    {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      sub_heading: {
        type: Sequelize.TEXT,
      },
      sub_heading_2: {
        type: Sequelize.TEXT,
      },
      description_2: {
        type: Sequelize.TEXT,
      },
      sub_heading_3: {
        type: Sequelize.TEXT,
      },
      description_3: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
      slug: {
        type: Sequelize.STRING,
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

  return message_mission_sustainability;
};
