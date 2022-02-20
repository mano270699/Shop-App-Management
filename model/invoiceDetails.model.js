const { uniqueKeys } = require("sequelize/dist/lib/model");
module.exports = (sequelize, Sequelize) => {
    const InvoiceDetails = sequelize.define('InvoiceDetails', {
        invoice_id: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: false
        },
        total_price: {
            type: Sequelize.DECIMAL(8, 2),
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




    }, { timestamps: false, tableName: 'invoice_details' });
    InvoiceDetails.removeAttribute('id');

    return InvoiceDetails;
}