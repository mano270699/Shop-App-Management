const { uniqueKeys } = require("sequelize/dist/lib/model");

module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('Admin', {

        admin_Id: {

            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false

        },
        password: {
            type: Sequelize.STRING,

        },
        phone: {
            type: Sequelize.STRING,

        }
    }, { timestamps: false, tableName: 'admin' });



    return Admin;
}