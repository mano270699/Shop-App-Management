const { uniqueKeys } = require("sequelize/dist/lib/model");

module.exports = (sequelize, Sequelize) => {
    const Items = sequelize.define('Items', {

        item_id: {

            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },

        item_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: false
        },


    }, { timestamps: false, tableName: 'items' });



    return Items;
}