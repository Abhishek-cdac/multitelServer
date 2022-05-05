module.exports = (sequelize, Sequelize) => {
    const Promotion_tag = sequelize.define("Promotion_tag", {
        name: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: true
    });

    return Promotion_tag;
};