const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const flash    = require('connect-flash');
app.use(flash()); // use connect-flash for flash messages stored in session

const bcrypt = require('bcrypt');
const passport = require('passport');


const indexRoutes = require('./routes/index.routes');

//Avoid collision with frontend
const port = 2000;

//MYSQL db connection const
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chad'
});

//Db connect act
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Db connection successful');
});
global.db = db;

// Middleware
app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

//Routes
app.use('/', indexRoutes);

//Routes - /login
app.get('/login', function(req, res) {
    res.render('login.ejs',{ message: req.flash('loginMessage') });
});    
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', 
    failureRedirect : '/login',
    failureFlash : true 
})
);
//cookie expiration logic here?


// Listen on port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});