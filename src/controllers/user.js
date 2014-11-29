(function (exports) {
    'use strict';

    var sw = require('swagger-node-express'),
        paramTypes = sw.paramTypes,
        oauth2 = require('../oauth2'),
        User = require('../models/user');

    exports.post = {
        'spec': {
            description: "Operations about users",
            path: "/users",
            method: "POST",
            summary: "Sign up",
            notes: "For now its only about keeping track of user so name is enough",
            type: "User",
            nickname: "signup",
            produces: ["application/json"],
            parameters: [
                paramTypes.body(
                    'User',
                    'User informations',
                    'User'
                )
            ],
            responseMessages: []
        },
        'action': function (req, res) {
            var user = new User(req.body);

            user.save(function (err, u) {
                oauth2.doAuthenticate(req.clientId, u, function (err, accessToken, refreshToken, params) {
                    res.send({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        token_type: 'Bearer',
                        expire_time: params.expire_time
                    });
                });
            });
        }
    };
})(module.exports);
