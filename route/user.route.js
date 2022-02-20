const auth = require('../middleware/auth.js');
module.exports = function(app) {

    const users = require('../controller/user.controller.js');

    // Retrieve all User
    app.get('/api/users', auth, users.findAll);

    // Retrieve a single User by Id
    app.get('/api/users/:admin_Id', users.findById);

    // Update a User with Id
    app.put('/api/users/:userId', auth, users.update);



   

    // User signin
    app.post('/api/user/signin', users.signin);
    app.get('/api/user/signinpage', users.signInPage);
    app.get('/api/user/logout', users.logout);
    // Update Admin info
    app.put('/api/user/adminSetting', users.AdminSetting);
}