var async = require('async');

(function () {
    'use strict';

    function myStepDefinitionsWrapper() {
        /*jshint validthis:true */

        this.World = require('../support/world.js').World;

        this.Given(/^there are following users:$/, function (table, callback) {
            var User = this.models.User;

            async.eachSeries(table.hashes(), function (data, next) {
                var row = new User(data);

                row.save(next);
            }, callback);
        });

        this.Given(/^I am an API client$/, function (callback) {
            callback();
        });

        this.When(/^the client requests GET "([^"]*)"$/, function (url, callback) {
            this.request({
                method: 'GET',
                uri: url
            }, callback);
        });

        this.Then(/^the response should be a "([^"]*)" with JSON:$/, function (statusCode, answer, callback) {
            if (this.response.statusCode !== parseInt(statusCode, 10)) {
                return callback.fail(new Error('Expected status code ' + statusCode));
            }

            if (false === this.areEqualJSONs(this.responseBody, answer)) {
                return callback.fail(new Error('Expected response body ' + answer));
            }

            callback();
        });
    }

    module.exports = myStepDefinitionsWrapper;
})();
