const { uniqueKeys } = require("sequelize/dist/lib/model");
module.exports = (sequelize, Sequelize) => {
    const InvoiceInfo = sequelize.define('InvoiceInfo', {
        invoice_id: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        invoice_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date_time: {
            type: Sequelize.STRING,
            allowNull: false
        },

        total_price: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: false
        },




    }, { timestamps: false, tableName: 'v_invoice_info' });
    InvoiceInfo.removeAttribute('id');

    return InvoiceInfo;
}