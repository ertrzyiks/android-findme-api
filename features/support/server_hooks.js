var myAfterHooks = function () {
    "use strict";
    /*jshint validthis:true */

    var app, server;

    this.BeforeFeatures(function (event, callback) {
        app = require('../../src/app.js');

        app
            .start()
            .then(function (data) {
                server = data.server;

                callback();
            })
            .catch(function (err) {
                console.log(err);
                callback(err);
            });
    });

    this.BeforeScenario(function (event, callback) {
        app.clearDatabase(callback);
    });

    this.AfterFeatures(function (event, callback) {
        if (server) {
            server.close();
        }

        callback();
    });
};

module.exports = myAfterHooks;
