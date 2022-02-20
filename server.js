const express = require("express");
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cors());



//const db = require('./config/db.config.js');
// force: true //will drop the table if it already exists
// db.sequelize.sync().then(() => {
//     console.log(' Resync with DB');
// });

// api routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Our App." });
});

require('./route/user.route.js')(app);
require('./route/dashboard.route.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
global.PORT = PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});