module.exports = (sequelize, Sequelize) => {
    const service_products = sequelize.define("service_products", {
        name: {
            type: Sequelize.STRING
        },
        serviceId: {
            type: Sequelize.INTEGER(11)
        },
        userId: {
            type: Sequelize.INTEGER(11)
        },
        price: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        cover_img: {
            type: Sequelize.TEXT
        },
        approved: {
            type: Sequelize.BOOLEAN,
            allowNull: false, 
            defaultValue: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true
    });

    return service_products;
};