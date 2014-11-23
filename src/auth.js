(function (exports) {
    'use strict';

    var passport = require('passport'),
        BearerStrategy = require('passport-http-bearer').Strategy,

        AccessToken = require('./models/access_token'),
        User = require('./models/user');

    passport.use(new BearerStrategy(
        function (token, done) {
            AccessToken.where({ token: token }).findOne(function (err, accessToken) {
                if (err) {
                    return done(err);
                }

                if (!accessToken) {
                    return done(null, false);
                }

                User.where({ _id: accessToken.user_id })
                    .findOne(function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (!user) {
                            return done(null, false);
                        }

                        return done(null, user, { scope: 'all' });
                    });
            });
        }
    ));

    exports.client = [function (req, res, next) {
        var authorization = req.headers.authorization;

        if (0 !== authorization.indexOf('Bearer')) {
            req.clientId = req.headers.authorization;
        }

        next();
    }];

    exports.bearer = [
        passport.authenticate('bearer', { session: false })
    ];
})(module.exports);
