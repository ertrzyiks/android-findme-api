(function () {
    'use strict';
    var async = require('async'),
        oauth2 = require('../../src/oauth2');

    function myStepDefinitionsWrapper() {
        /*jshint validthis:true */

        this.World = require('../support/world.js').World;

        this.Given(/^I am an API client$/, function (callback) {
            var Client = this.models.Client,
                client = new Client({
                    title: 'MyTestingClient',
                    oauth_secret: '1234567890'
                });

            client.save(function (err, cl) {
                this.client = cl;
                callback();
            }.bind(this));
        });

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

        this.Given(/^I join as "([^"]*)"$/, function (username, callback) {
            var User = this.models.User,
                user = new User({
                    username: username
                });

            user.save(function (err, u) {
                if (err) {
                    callback(err);
                    return;
                }

                oauth2.doAuthenticate(this.client, u, function (err, accessToken, refreshToken) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    this.setAccessToken(accessToken);
                    this.setRefreshToken(refreshToken);

                    callback(null);
                }.bind(this));
            }.bind(this));
        });

        this.When(/^the client requests GET "([^"]*)"$/, function (url, callback) {
            this.request({
                method: 'GET',
                uri: url
            }, callback);
        });

        this.When(/^the client requests POST "([^"]*)" with data:$/, function (url, postdata, callback) {
            this.request({
                method: 'POST',
                uri: url,
                body: JSON.stringify(this.parseJSON(postdata)),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }, callback);
        });

        this.Then(/^print last response$/, function (callback) {
            console.log();
            console.log(this.response.statusCode);
            console.log(this.responseBody);
            console.log();
            callback();
        });

        this.Then(/^the response should be a "([^"]*)" with JSON:$/, function (statusCode, answer, callback) {
            if (this.response.statusCode !== parseInt(statusCode, 10)) {
                return callback.fail('Expected status code ' + statusCode + ", but got " + this.response.statusCode);
            }

            var wildcards = {
                "ROOM_ID": "string",
                "ACCESS_TOKEN": "string",
                "REFRESH_TOKEN": "string",
                "TIMESTAMP": "number"
            };

            if (false === this.areEqualJSONs(this.responseBody, answer, wildcards)) {
                return callback.fail(
                    'Expected response body ' + answer + ", but got " + this.responseBody
                );
            }

            callback();
        });
    }

    module.exports = myStepDefinitionsWrapper;
})();
