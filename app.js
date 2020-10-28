const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const { debugPort } = require('process');
const app = express();

//Avoid collision with frontend
const port = 5000;

//Db connection const
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'chad'
});
module.exports =  db;


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

// Listen on port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});