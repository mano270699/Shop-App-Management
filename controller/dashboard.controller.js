const db = require('../config/db.config.js');



const storage = require('node-sessionstorage');
const { Sequelize } = require('../config/db.config.js');
const Category = db.category;
const Items = db.item;
const Invoice = db.invoice;
const InvoiceDetalis = db.invoiceDetalis;
const InvoiceInfo = db.InvoiceInfo;
const InvoiceItems = db.InvoiceItems;


//const Category = require('../model/category.model');

// FETCH all Users
exports.dashboardPage = (req, res, ) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;


    console.log(storage.getItem('token'));

    if (storage.getItem('token') != null) {

        res.render("dashboard.ejs", {
            name: storage.getItem('name'),
            email: storage.getItem('email'),
            phone: storage.getItem('phone'),
            urlMain: url
        });
    } else {
        res.render("404.ejs", {

            urlMain: url
        });
    }

};

exports.itemsPage = (req, res) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;
    if (storage.getItem('token') != null) {

        res.render("items.ejs", {
            name: storage.getItem('name'),
            email: storage.getItem('email'),
            phone: storage.getItem('phone'),
            urlMain: url
        });
    } else {
        res.render("404.ejs", {

            urlMain: url
        });
    }


};
exports.settingPage = (req, res) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;
    if (storage.getItem('token') != null) {


        //res.status(200).send(count);

        res.render("settings.ejs", {
            name: storage.getItem('name'),
            email: storage.getItem('email'),
            phone: storage.getItem('phone'),
            admin_id: storage.getItem('id'),

            urlMain: url
        });





    } else {
        res.render("404.ejs", {

            urlMain: url
        });
    }


};


exports.invoicePage = (req, res) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;
    if (storage.getItem('token') != null) {
        var invoice_id = req.params.id;
        InvoiceInfo.findOne({ where: { invoice_id: invoice_id } })
            .then(function(record) {

                console.log(record["invoice_name"]);
                var invoiceid = record["invoice_id"];
                var Invoice_name = record["invoice_name"];
                var Invoice_date = record["date_time"];
                var Invoice_totalPrice = record["total_price"];
                res.render("invoice.ejs", {
                    name: storage.getItem('name'),
                    email: storage.getItem('email'),
                    phone: storage.getItem('phone'),
                    admin_id: storage.getItem('id'),
                    invoiceid: invoiceid,
                    Invoice_name: Invoice_name,
                    Invoice_date: Invoice_date,
                    Invoice_totalPrice: Invoice_totalPrice,
                    urlMain: url
                });
            });


    } else {
        res.render("404.ejs", {

            urlMain: url
        });
    }


};

exports.getAllItems = (req, res) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;
    if (storage.getItem('token') != null) {

        Items.findAll({
            order: [
                ['item_id', 'DESC']
            ],
            // conditions
        }).then(function(Items) {

            res.status(200).send(Items);


        }).catch(err => {
            res.status(400).send({ msa: 'لم نتمكن من اتمام العمليه حاول مرة اخري ' });
        });
    } else {
        res.send({ msg: 'sorry, you aren\'t authorized :(' })
    }
};
exports.addNewItem = (req, res) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;
    if (storage.getItem('token') != null) {
        let errors = [];
        if (errors.length > 0) {
            return res.status(400).send({ msg: errors });
        } else {
            Items.create({

                item_name: req.body.item_name,
                price: req.body.price,
            }).then((newItem) => {
                console.log("Item added Successfully :)  " + JSON.stringify(newItem));
                res.status(200).send({ msg: "تم إضافة المنتج بنجاح" });
            }).catch((err) => {
                console.log("Error" + err);
                res.status(400).send({ msg: "حدث خطأ يرجي إعادة المحاولة " });
            });
        }




    } else {
        res.send({ msg: 'sorry, you aren\'t authorized :(' })
    }
};

exports.DeleteItem = (req, res) => {
    Items.findAll({ where: { item_id: req.params.id } }).then((results) => {
        console.log("item_id :" + JSON.stringify(results));
        Items.destroy({
            where: {
                item_id: req.params.id
            }
        }).then((result) => {
            console.log(JSON.stringify(result));
            return res.status(200).send({ msg: "تم حذف المنتج بنجاح" })
        }).catch((err) => {
            console.log("Error" + err);
            res.status(400).send({ msg: "حدث خطأ يرجي إعادة المحاولة " });
        });

    });
};

exports.EditItem = (req, res) => {

    let
        item_id = req.params.id,

        item_name = req.body.item_name,
        price = req.body.price;

    Items.update({

        item_name: item_name,
        price: price,

    }, { where: { item_id: item_id } }).then(() => {
        res.status(200).send({ msg: "تم التعديل علي المنتج بنجاح " });
    }).catch((error) => {
        // do seomthing with the error
        res.status(400).send({ msg: "نأسف لعدم اتمام العمليه حاول مرة اخري " });
        throw new Error(error)

    });


};


exports.getAllInvoice = (req, res) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;
    // if (storage.getItem('token') != null) {

    Invoice.findAll({

            order: [
                ['invoice_id', 'DESC']
            ],
        }

    ).then(function(Invoice) {

        res.status(200).send(Invoice);


    }).catch(err => {
        res.status(400).send({ msa: 'لم نتمكن من اتمام العمليه حاول مرة اخري ' });
    });
    /* } else {
         res.send({ msg: 'sorry, you aren\'t authorized :(' })
     }*/
};

exports.addNewInvoice = (req, res) => {
    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;

    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    var dates = ("0" + date_ob.getDate()).slice(-2);
    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    var year = date_ob.getFullYear();

    var datedisplay = year + "-" + month + "-" + dates
        // var timedisplay = hours + ":" + minutes + ":" + seconds;
    admin_id = storage.getItem('id');
    let
        admin_Id = admin_id,
        invoice_name = req.body.invoice_name,

        date_time = datedisplay;

    if (admin_Id == null || admin_Id == '') {
        res.status(400).send({ msa: 'لم نتمكن من اتمام العمليه  ' });
        res.render("404.ejs", {

            urlMain: url
        });

    } else {
        const newInvoice = new Invoice({ admin_Id: admin_Id, invoice_name: invoice_name, date_time: date_time, month: year + "-" + month, year: year });

        newInvoice.save()

        .then((newInvoice) => {

            console.log("Invoice added Succssfully :)  " + newInvoice.invoice_id);
            res.status(200).json({ invoice_id: newInvoice.invoice_id, })



        }).catch((err) => {
            console.log(err)
            res.status(400).send({ msa: 'لم نتمكن من اتمام العمليه  ' });

        });
    }





};
exports.addItemToInvoice = (req, res) => {
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    var dates = ("0" + date_ob.getDate()).slice(-2);
    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    var year = date_ob.getFullYear();

    var datedisplay = year + "-" + month + "-" + dates
    let
        invoice_id = req.body.invoice_id,
        item_id = req.body.item_id,
        quantity = req.body.quantity,
        price = req.body.price,
        total_price = req.body.total_price;

    const newInvoiceDetails = new InvoiceDetalis({ invoice_id: invoice_id, item_id: item_id, quantity: quantity, price: price, total_price, total_price, date_time: datedisplay, month: year + "-" + month, year: year });

    newInvoiceDetails.save()

    .then((newInvoiceDetails) => {

        console.log("Invoice added Succssfully :)  " + newInvoiceDetails.invoice_id);

        return res.status(200).json({ msg: "تم اضافة المنتج بنجاح" })

    }).catch((err) => {
        console.log(err)
        if (err.parent.code == 'ER_DUP_ENTRY' || err.parent.errno == 1062) {
            return res.send({ error: true, msg: 'لا يمكن اضافة المنتج مرتين' });
        }
        res.status(400).send({ msa: 'لم نتمكن من اضافة المنتجات' });

    });

};

exports.deleteInvoice = (req, res) => {
    InvoiceDetalis.destroy({
        where: {
            invoice_id: req.params.id //this will be your id that you want to delete
        }
    }).then(function(rowDeleted) {
        Invoice.destroy({
            where: {
                invoice_id: req.params.id //this will be your id that you want to delete
            }
        }).then(function(rowDeleted) { // rowDeleted will return number of rows deleted

            return res.status(200).send({ msg: "تم حذف الفاتورة بنجاح" })

        }, function(err) {
            return res.status(400).send("Error" + err);
        }); // rowDeleted will return number of rows deleted

    }, function(err) {
        return res.status(400).send("Error in InvoiceDetails" + err);
    });

};

exports.getInvoiceItemsData = (req, res) => {

    InvoiceItems.findAll({

        // conditions
        where: { invoice_id: req.params.id }
    }).then(function(item) {
        res.send(item);
    });
};
exports.getTodayInvoice = (req, res) => {
    // moment().format('YYYY-MM-DD HH:mm:ss')
    let d = new Date();
    let day = d.getDate().toString().padStart(2, "0");
    let Month = (d.getMonth() + 1).toString().padStart(2, "0");
    let year = d.getFullYear();

    let DateNow = year + "-" + Month + "-" + day;
    console.log(DateNow);

    Invoice.count({
            where: {
                date_time: DateNow,
            }
        })
        .then(function(count) {
            return res.status(200).send(JSON.stringify(count));
        });

};
exports.getMonthlyInvoice = (req, res) => {
    // moment().format('YYYY-MM-DD HH:mm:ss')
    let d = new Date();

    let Month = (d.getMonth() + 1).toString().padStart(2, "0");
    let year = d.getFullYear();

    let DateNow = year + "-" + Month;



    Invoice.count({
            where: {
                month: DateNow,
            }
        })
        .then(function(count) {
            return res.status(200).send(JSON.stringify(count));
        });

};
exports.getYearInvoice = (req, res) => {
    // moment().format('YYYY-MM-DD HH:mm:ss')
    let d = new Date();

    let year = d.getFullYear();




    Invoice.count({
            where: {
                year: year,
            }
        })
        .then(function(count) {
            return res.status(200).send(JSON.stringify(count));
        });

};

exports.getTodayMoney = (req, res) => {
    // moment().format('YYYY-MM-DD HH:mm:ss')
    let d = new Date();
    let day = d.getDate().toString().padStart(2, "0");
    let Month = (d.getMonth() + 1).toString().padStart(2, "0");
    let year = d.getFullYear();

    let DateNow = year + "-" + Month + "-" + day;
    console.log(DateNow);

    InvoiceDetalis.findAll({
        attributes: [
            [Sequelize.fn('Sum', Sequelize.col('total_price')), 'total_priceToday']
        ],
        where: {
            date_time: DateNow
        }
    }).then(function(total_price) {
        return res.status(200).send(total_price);
    });


};
exports.getMonthlyMoney = (req, res) => {
    // moment().format('YYYY-MM-DD HH:mm:ss')
    let d = new Date();
    let year = d.getFullYear();

    let Month = (d.getMonth() + 1).toString().padStart(2, "0");
    let DateNow = year + "-" + Month;



    InvoiceDetalis.findAll({
        attributes: [
            [Sequelize.fn('Sum', Sequelize.col('total_price')), 'total_priceMonthly']
        ],
        where: {
            month: DateNow
        }
    }).then(function(total_price) {
        return res.status(200).send(total_price);
    });


};
exports.getYearMoney = (req, res) => {
    // moment().format('YYYY-MM-DD HH:mm:ss')
    let d = new Date();
    let year = d.getFullYear();




    InvoiceDetalis.findAll({
        attributes: [
            [Sequelize.fn('Sum', Sequelize.col('total_price')), 'total_priceYear']
        ],
        where: {
            year: year
        }
    }).then(function(total_price) {
        return res.status(200).send(total_price);
    });


};