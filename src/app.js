(function () {
    'use strict';

    var q = require('q'),
        async = require('async'),
        express = require('express'),
        bodyParser = require('body-parser'),
        oauth2 = require('./oauth2'),
        auth = require('./auth'),

        mongoose = require('mongoose'),
        config = require('config'),

        getConnectionString = require('./util/mongo_connection_string'),

        app = express(),
        subapp = express(),

        swagger = require("swagger-node-express").createNew(subapp),

        mongo_config = config.get('mongo');

    app.use(bodyParser.json());
    app.use(require('./cors'));
    app.use(auth.client);
    app.use('/api/v1', subapp);
    app.use('/oauth/v2/token', oauth2.token);

    swagger.addModels(require('./models'));

    subapp.use('/room', auth.bearer);

    swagger.addPost(require('./controllers/user').post);
    swagger.addGet(require('./controllers/room').get);
    swagger.addPost(require('./controllers/room').post);

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
