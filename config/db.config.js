const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: 0,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});
module.exports = sequelize;
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
//db.category = require('../model/category.model.js')(sequelize, Sequelize);
db.item = require('../model/items.model.js')(sequelize, Sequelize);
db.invoice = require('../model/invoice.model.js')(sequelize, Sequelize);
db.invoiceDetalis = require('../model/invoiceDetails.model.js')(sequelize, Sequelize);
db.InvoiceInfo = require('../model/v_invoiceinfoModel.js')(sequelize, Sequelize);
db.InvoiceItems = require('../model/v_invoice_item.model.js')(sequelize, Sequelize);


module.exports = db;