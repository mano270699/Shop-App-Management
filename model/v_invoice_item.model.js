const { uniqueKeys } = require("sequelize/dist/lib/model");
module.exports = (sequelize, Sequelize) => {
    const InvoiceItems = sequelize.define('InvoiceItems', {
        invoice_id: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item_name: {
            type: Sequelize.STRING,
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




    }, { timestamps: false, tableName: 'v_invoice_item' });
    InvoiceItems.removeAttribute('id');

    return InvoiceItems;
}