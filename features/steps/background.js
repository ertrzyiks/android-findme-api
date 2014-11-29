(function () {
    'use strict';
    var async = require('async'),
        ObjectId = require('mongoose').Types.ObjectId;

    function myStepDefinitionsWrapper() {
        /*jshint validthis:true */

        this.World = require('../support/world.js').World;

        this.Given(/^there are following rooms:$/, function (table, callback) {
            var Room = this.models.Room;

            async.eachSeries(table.hashes(), function (data, next) {
                var row = new Room(data);

                row.save(next);
            }, callback);
        });

        this.Given(/^there are following clients:$/, function (table, callback) {
            var Client = this.models.Client;

            async.eachSeries(table.hashes(), function (data, next) {
                var row = new Client(data);

                row.save(next);
            }, callback);
        });

        this.Given(/^there are following users:$/, function (table, callback) {
            var User = this.models.User;

            async.eachSeries(table.hashes(), function (data, next) {
                var row = new User(data);

                row.save(next);
            }, callback);
        });

        this.Given(/^there are following users:$/, function (table, callback) {
            var User = this.models.User;

            async.eachSeries(table.hashes(), function (data, next) {
                data._id = ObjectId.fromString(data._id);
                var row = new User(data);

                row.save(next);
            }, callback);
        });
    }

    module.exports = myStepDefinitionsWrapper;
})();
