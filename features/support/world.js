(function (exports) {
    'use strict';

    var request = require('request'),
        diff = require('deep-diff').diff,

        Room = require('../../src/models/room.js'),
        Client = require('../../src/models/client.js'),
        User = require('../../src/models/user.js');

    exports.World = function World(done) {
        this.baseUrl = 'http://127.0.0.1:3000';

        this.models = {};
        this.models.Room = Room;
        this.models.Client = Client;
        this.models.User = User;

        this.setAccessToken = function (at) {
            this.accessToken = at;
        };

        this.setRefreshToken = function (rt) {
            this.refreshToken = rt;
        };

        this.getUrl = function (url) {
            if (url.match('^/')) {
                return this.baseUrl + url;
            }

            return url;
        };

        this.parseJSON = function (json, description) {
            if (!json) {
                return {};
            }

            var obj;

            try {
                obj = JSON.parse(json);
            }
            catch (err) {
                throw 'Invalid ' + description || "" + 'json, got: ' + json;
            }

            return obj;
        };

        this.isArray = function (obj) {
            return '[object Array]' === Object.prototype.toString.call(obj);
        };

        this.areEqualJSONs = function (json1, json2, wildcards) {
            var obj1 = this.parseJSON(json1),
                obj2 = this.parseJSON(json2),

                ok = true,
                differences;

            if (this.isArray(obj1) !== this.isArray(obj2)) {
                return false;
            }

            differences = diff(obj1, obj2) || [];
            wildcards = wildcards || {};

            differences.forEach(function (difference) {
                var wildcardType = wildcards[difference.rhs];

                if ('undefined' === typeof(wildcardType) || typeof(difference.lhs) !== wildcardType) {
                    ok = false;
                }
            });

            return ok;
        };

        this.clearResponse = function () {
            this.response = {};
            this.responseBody = "";
        };

        this.getAuthenticateHeader = function () {
            return this.accessToken ? 'Bearer ' + this.accessToken : this.client._id;
        };

        this.request = function (params, callback) {
            var _response_, _responseBody_ = "";

            this.clearResponse();

            params.uri = this.getUrl(params.uri);
            params.headers = params.headers || {};
            params.headers.Authorization = this.getAuthenticateHeader();

            request(params)
                .on('response', function (response) {
                    _response_ = response;
                })
                .on('data', function (data) {
                    _responseBody_ += data;
                })
                .on('end', function () {
                    this.response = _response_;
                    this.responseBody = _responseBody_;

                    callback();
                }.bind(this))
            ;
        };

        process.nextTick(done);
    };
})(module.exports);
