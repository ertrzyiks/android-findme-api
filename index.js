(function () {
    'use strict';

    var express = require("express"),
        mongoose = require('mongoose'),
        config = require('config'),

        app = express(),

        mongo_host = config.get('mongo_host'),
        mongo_dbname = config.get('mongo_dbname'),
        mongo_username = config.get('mongo_username'),
        mongo_password = config.get('mongo_password'),

        server,

        connectionString = mongo_password + '@' + mongo_host + '/' + mongo_dbname;

    if (mongo_username) {
        if (mongo_password) {
            connectionString = mongo_username + ":" + mongo_password + "@";
        } else {
            connectionString = mongo_username + "@";
        }
    }

    mongoose.connect('mongodb://' + mongo_username + ':' + mongo_password + '@' + mongo_host + '/' + mongo_dbname);

    app.get('/api', function (req, res) {
        res.send('Ecomm API is running');
    });

    server = app.listen(3000);

    module.exports = server;
})();
