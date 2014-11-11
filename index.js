(function () {
    'use strict';

    var application_root = __dirname,
        express = require("express"),
        path = require("path"),
        mongoose = require('mongoose'),
        config = require('config'),

        app = express.createServer(),

        mongo_host = config.get('mongo_host'),
        mongo_dbname = config.get('mongo_dbname'),
        mongo_username = config.get('mongo_username'),
        mongo_password = config.get('mongo_password');

    mongoose.connect('mongodb://' + mongo_username + ':' + mongo_password + '@' + mongo_host + '/' + mongo_dbname);

    app.configure(function () {
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(application_root, "public")));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.get('/api', function (req, res) {
        res.send('Ecomm API is running');
    });

    app.listen(3000);
})();
