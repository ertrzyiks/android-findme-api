(function () {
    'use strict';

    var swig = require('swig');

    function myStepDefinitionsWrapper() {
        /*jshint validthis:true */

        this.World = require('../support/world.js').World;

        this.When(/^I requests GET "([^"]*)"$/, function (url, callback) {
            this.request({
                method: 'GET',
                uri: url
            }, callback);
        });

        this.When(/^I requests POST "([^"]*)" with data:$/, function (url, postdata, callback) {
            var postDataString = swig.render(postdata, { locals: {
                "CLIENT_ID": this.client._id.toString(),
                "CLIENT_SECRET": this.client.oauth_secret,
                "ACCESS_TOKEN": this.getAccessToken(),
                "REFRESH_TOKEN": this.getRefreshToken()
            }});

            this.request({
                method: 'POST',
                uri: url,
                body: JSON.stringify(this.parseJSON(postDataString)),
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
