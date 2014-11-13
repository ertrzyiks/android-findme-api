var request = require('request');

exports.World = function World(done) {
    this.baseUrl = 'http://127.0.0.1:3000';

    this.getUrl = function (url) {
        if (url.match('^/')) {
            return this.baseUrl + url;
        }

        return url;
    };

    this.clearResponse = function (response) {
        this.response = {};
        this.responseBody = "";
    };

    this.request = function (params, callback) {
        var _response_, _responseBody_ = "";

        this.clearResponse();

        params.uri = this.getUrl(params.uri);

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

    done();
};

