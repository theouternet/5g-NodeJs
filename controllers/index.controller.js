const fs = require('fs');

exports.getHomePage = (req, res) => {
    // Get all Users from db - syntax as variable
    let query = "SELECT * FROM `ilance_users` ORDER BY user_id ASC";

    // Query db
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('index.ejs', {
            title: "Welcome to iLance - View Users",
            users: result
        });
    });
};
