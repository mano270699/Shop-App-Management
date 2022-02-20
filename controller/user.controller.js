const db = require('../config/db.config.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const env = require('../config/env.js');
// var sessionStorage = require('session-storage');
const storage = require('node-sessionstorage');

const User = db.users;

// FETCH all Users
exports.findAll = (req, res) => {
    User.findAll().then(users => {
        // Send all users to Client
        res.send(users);
    });
};

// Find a User by Id
exports.findById = (req, res) => {
    User.findOne({ admin_Id: req.params.admin_Id }).then(user => {
        storage.setItem('id', user.admin_Id);
        storage.setItem('name', user.name);
        storage.setItem('email', user.email);
        storage.setItem('phone', user.phone);
        res.status(200).send(user);
    })
};

// Update a User
exports.update = (req, res) => {
    const id = req.params.admin_Id;
    User.update({ name: req.body.name, email: req.body.email, password: req.body.password, phone: req.body.phone }, { where: { id: req.params.admin_Id } }).then(() => {
        res.status(200).send({ message: 'updated successfully a user with id = ' + id });
    });
};





exports.signin = (req, res) => {

    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;


    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ msg: "هذا المستخدم غير موجود " });
            } else {
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {

                    return res.status(401).send({
                        accessToken: null,
                        msg: "!البيانات غير صحيحة لايمكنك الدخول"
                    });
                }
                var token = jwt.sign({ id: user.id }, env.JWT_ENCRYPTION, {
                    expiresIn: 60 * 60 * 24 // 24 hours
                });

                storage.setItem('id', user.admin_Id);
                storage.setItem('name', user.name);
                storage.setItem('email', user.email);
                storage.setItem('phone', user.phone);

                storage.setItem('token', token);

                //return res.status(200).send({ msg: `/api/dashboard/dashboardPage` });
                res.writeHead(301, { Location: `${url}/api/dashboard/dashboardPage` }, );
                res.end();


            }

        })
        .catch(err => {
            res.status(500).send({ msg: err.message });
        });
};
exports.signInPage = (req, res) => {

    var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + PORT;
    if (storage.getItem('token') != null) {

        res.redirect(url + '/api/dashboard/dashboardPage')
    } else {
        res.render("auth-login.ejs", {

            urlMain: url
        });

    }






};
exports.logout = (req, res) => {
    storage.removeItem('id');
    storage.removeItem('name');
    storage.removeItem('email');
    storage.removeItem('phone');
    storage.removeItem('token');

    res.redirect('/api/user/signinpage');



}
exports.AdminSetting = (req, res) => {
    let
        name = req.body.name,
        email = req.body.email,
        phone = req.body.phone,
        admin_Id = req.body.admin_Id;
    if (req.body.password == "" || req.body.password == null) {

        User.findOne({ where: { admin_Id: admin_Id } })
            .then(user => {

                if (!user) {
                    throw new Error('No record found')
                }
                values = {
                    name: name,
                    email: email,
                    phone: phone
                }
                user.update(values).then(updatedRecord => {
                    console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                        // login into your DB and confirm update
                    res.status(200).send({ msg: "تم التعديل علي البروفيل بنجاح " });
                })

            })
            .catch((error) => {
                // do seomthing with the error
                res.status(400).send({ msg: "نأسف لعدم اتمام العمليه حاول مرة اخري " });
                throw new Error(error)

            });


    } else {

        User.update({ name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8), phone: req.body.phone }, { where: { admin_Id: req.body.admin_Id } }).then(() => {
            res.status(200).send({ msg: "تم التعديل علي البروفيل بنجاح " });

        }).catch((error) => {
            // do seomthing with the error
            res.status(400).send({ msg: "نأسف لعدم اتمام العمليه حاول مرة اخري " });
            throw new Error(error)

        });

        /*  User.findOne({ where: { admin_Id: admin_Id } })
              .then(user => {
                  if (!user) {
                      throw new Error('No record found')
                  }

                  console.log(`retrieved record ${JSON.stringify(record,null,2)}`)



                  let values = {
                      name: name,
                      email: email,
                      password: bcrypt.hashSync(req.body.password, 8),
                      phone: phone

                  }


                  user.update(values).then(updatedRecord => {
                      console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                          // login into your DB and confirm update
                      res.status(200).send({ msg: "تم التعديل علي البروفيل بنجاح " });
                  })

              })*/

    }




}