(function () {
    'use strict';
    var oauth2 = require('../../src/oauth2');

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

        this.When(/^my access token expire$/, function (callback) {
            this.setAccessToken(null);
            callback();
        });
    }

    module.exports = myStepDefinitionsWrapper;
})();
