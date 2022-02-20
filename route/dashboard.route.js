const auth = require('../middleware/auth.js');
module.exports = function(app) {

    const dashboard = require('../controller/dashboard.controller.js');
    //Pages Route
    app.get('/api/dashboard/dashboardPage', dashboard.dashboardPage);

    app.get('/api/dashboard/itemsPage', dashboard.itemsPage);
    app.get('/api/dashboard/settingPage', dashboard.settingPage);
    app.get('/api/dashboard/invoicePage/:id', dashboard.invoicePage);
    //Dashboard Route

    //Item Route

    app.get('/api/dashboard/getAllItems', dashboard.getAllItems);
    app.post('/api/dashboard/addNewItem', dashboard.addNewItem);
    app.delete('/api/dashboard/deleteItem/:id', dashboard.DeleteItem);
    app.put('/api/dashboard/editItem/:id', dashboard.EditItem);
    //Dashboard Route
    app.get('/api/dashboard/getAllInvoice', dashboard.getAllInvoice);
    app.post('/api/dashboard/addNewInvoice', dashboard.addNewInvoice);
    app.post('/api/dashboard/addItemToInvoice', dashboard.addItemToInvoice);
    app.delete('/api/dashboard/deleteInvoice/:id', dashboard.deleteInvoice);
    //invoice Data 
    app.get('/api/dashboard/getInvoiceItemsData/:id', dashboard.getInvoiceItemsData);
    app.get('/api/dashboard/getTodayInvoice', dashboard.getTodayInvoice);
    app.get('/api/dashboard/getMonthlyInvoice', dashboard.getMonthlyInvoice);
    app.get('/api/dashboard/getYearInvoice', dashboard.getYearInvoice);
    app.get('/api/dashboard/getTodayMoney', dashboard.getTodayMoney);
    app.get('/api/dashboard/getMonthlyMoney', dashboard.getMonthlyMoney);
    app.get('/api/dashboard/getYearMoney', dashboard.getYearMoney);




}