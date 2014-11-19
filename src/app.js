(function () {
    'use strict';

    var q = require('q'),
        async = require('async'),
        express = require('express'),
        bodyParser = require('body-parser'),

        mongoose = require('mongoose'),
        config = require('config'),

        getConnectionString = require('./util/mongo_connection_string'),

        app = express(),

        mongo_config = config.get('mongo'),

        roomsController = require('./controllers/rooms.js');

    app.use(bodyParser.json());
    app.use('/api/v1', roomsController.router);

    module.exports = {
        start: function () {
            var connectionString = getConnectionString(mongo_config),

                db = mongoose.connection,
                d = q.defer();

            mongoose.connect(connectionString);

            db.on('open', function () {
                var server = app.listen(3000);

                d.resolve(server);
            });

            db.on('error', function (err) {
                d.reject(err);
            });

            return d.promise.then(function (server) {
                server.on('close', function () {
                    mongoose.disconnect();
                });

                return server;
            });
        },

        clearDatabase: function (done) {
            async.parallel([
                function (next) {
                    mongoose.connection.collections.rooms.drop(next);
                }
            ], done);
        }
    };
})();
