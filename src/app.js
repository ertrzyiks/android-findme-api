(function () {
    'use strict';

    var q = require('q'),
        express = require('express'),
        mongoose = require('mongoose'),
        config = require('config'),

        app = express(),

        mongo_host = config.get('mongo_host'),
        mongo_dbname = config.get('mongo_dbname'),
        mongo_username = config.get('mongo_username'),
        mongo_password = config.get('mongo_password'),

        User = require('./models/user.js');

    app.get('/api', function (req, res) {
        res.send({ message: 'Ecomm API is running'});
    });

    app.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = user;
            });

            res.send(userMap);
        });
    });

    module.exports = {
        start: function () {
            var connectionString = mongo_host + '/' + mongo_dbname,
                d = q.defer(),
                db;

            if (mongo_username) {
                if (mongo_password) {
                    connectionString = mongo_username + ":" + mongo_password + "@" + connectionString;
                } else {
                    connectionString = mongo_username + "@" + connectionString;
                }
            }

            mongoose.connect('mongodb://' + connectionString);

            db = mongoose.connection;

            db.on('error', function (err) {
                d.reject(err);
            });

            db.on('open', function () {
                var server = app.listen(3000);

                d.resolve(server);
            });

            return d.promise.then(function (server) {
                server.on('close', function () {
                    mongoose.disconnect();
                });

                return server;
            });
        },

        clearDatabase: function (done) {
            mongoose.connection.collections.users.drop(done);
        }
    };
})();
