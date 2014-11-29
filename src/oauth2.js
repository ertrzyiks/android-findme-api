(function (exports) {
    'use strict';

    var oauth2orize = require('oauth2orize'),
        server = oauth2orize.createServer(),
        passport = require('passport'),
        crypto = require('crypto'),
        async = require('async'),

        Client = require('./models/client'),
        User = require('./models/user'),
        AccessToken = require('./models/access_token'),
        RefreshToken = require('./models/refresh_token');

    function saveAccessToken(client, user, next) {
        var now = new Date().getTime(),
            token = crypto.createHmac('sha1', 'access_token')
                .update([client._id, now].join())
                .digest('hex'),
            at;

        at = new AccessToken({
            token: token,
            user_id: user._id,
            client_id: client._id,
            scope: []
        });

        at.save(function (err, newAt) {
            next(err, newAt);
        });
    }

    function saveRefreshToken(client, user, next) {
        var now = new Date().getTime(),
            token = crypto.createHmac('sha1', 'access_token')
                .update([client._id, 'RT', now].join())
                .digest('hex'),
            rt;

        rt = new RefreshToken({
            token: token,
            user_id: user._id,
            client_id: client._id,
            scope: []
        });

        rt.save(function (err, newRt) {
            next(err, newRt);
        });
    }

    /**
     * @param {string, Document} client
     * @param {Function} done
     */
    exports.verifyClient = function (client, done) {
        if (!client) {
            done('Client can not be empty');
            return;
        }

        if ('string' !== typeof client) {
            done(null, client);
            return;
        }

        Client
            .where({
                _id: client
            })
            .findOne(done);
    };

    /**
     * @param {string, Client} client
     * @param {User} user
     * @param {Function} done
     */
    exports.doAuthenticate = function (client, user, callback) {
        exports.verifyClient(client, function (err, cl) {
            if (!cl) {
                callback('Client ' + client + ' not found');
                return;
            }

            var calls = [];
            calls.push(function (next) {
                saveAccessToken(cl, user, next);
            });
            calls.push(function (next) {
                saveRefreshToken(cl, user, next);
            });

            async.parallel(calls, function (err, data) {
                if (err) {
                    callback(err);
                    return;
                }

                var accessToken = data[0],
                    refreshToken = data[1];

                callback(null, accessToken.token, refreshToken.token, { expire_time: accessToken.expires });
            });
        });
    };

    server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
        var criteria = {
            token: refreshToken
        };

        function next(err, user) {
            if (err) {
                done(err);
                return;
            }

            exports.doAuthenticate(client, user, done);
        }

        RefreshToken
            .where(criteria)
            .findOne(function (err, rt) {
                if (err) {
                    return next(err);
                }

                User
                    .where({
                        _id: rt.user_id
                    })
                    .findOne(next);
            });
    }));

    exports.token = [
        passport.authenticate(['oauth2-client-password'], { session: false }),
        server.token(),
        server.errorHandler()
    ];
})(module.exports);
