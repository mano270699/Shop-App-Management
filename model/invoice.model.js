const { uniqueKeys } = require("sequelize/dist/lib/model");
module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define('Invoice', {
        invoice_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        admin_Id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        invoice_name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        date_time: {
            type: Sequelize.STRING,
            allowNull: false
        },

        month: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.STRING,
            allowNull: false
        },

    }, { timestamps: false, tableName: 'invoice' });

    return Invoice;
}