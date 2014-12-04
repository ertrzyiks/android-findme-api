(function () {
    'use strict';

    var q = require('q'),
        async = require('async'),
        express = require('express'),
        passport = require('passport'),
        bodyParser = require('body-parser'),
        oauth2 = require('./oauth2'),
        auth = require('./auth'),

        mongoose = require('mongoose'),
        config = require('config'),

        getConnectionString = require('./util/mongo_connection_string'),

        app = express(),
        subapp = express(),

        swagger = require("swagger-node-express").createNew(subapp),

        mongo_config = config.get('mongo'),
        port = config.get('port');

    app.use(bodyParser.json());
    app.use(require('./cors'));
    app.use(auth.client);
    app.use('/api/v1', subapp);
    app.use('/oauth/v2/token', oauth2.token);

    swagger.addModels(require('./models'));

    subapp.use(passport.initialize());
    subapp.use(/^\/rooms\/?(.*)/, auth.bearer);

    swagger.addPost(require('./controllers/user').post);
    swagger.addGet(require('./controllers/room').getList);
    swagger.addGet(require('./controllers/room').getById);
    swagger.addGet(require('./controllers/room').getUsers);
    swagger.addPost(require('./controllers/room').post);
    swagger.addPost(require('./controllers/room').postUser);

    swagger.configureSwaggerPaths('', '/doc', '');
    swagger.configure('/api/v1', require('../package.json').version);

    module.exports = {
        instance: app,

        start: function () {
            var connectionString = getConnectionString(mongo_config),

                db = mongoose.connection,
                d = q.defer();

            mongoose.connect(connectionString);

            db.on('open', function () {
                var server = app.listen(port);

                d.resolve({
                    server: server,
                    port: port
                });
            });

            db.on('error', function (err) {
                d.reject(err);
            });

            return d.promise.then(function (data) {
                data.server.on('close', function () {
                    mongoose.disconnect();
                });

                return data;
            });
        },

        clearDatabase: function (done) {
            async.parallel([
                function (next) {
                    mongoose.connection.collections.rooms.drop(next);
                },
                function (next) {
                    mongoose.connection.collections.users.drop(next);
                },
                function (next) {
                    mongoose.connection.collections.clients.drop(next);
                },
                function (next) {
                    mongoose.connection.collections.accesstokens.drop(next);
                },
                function (next) {
                    mongoose.connection.collections.refreshtokens.drop(next);
                }
            ], done);
        }
    };
})();
