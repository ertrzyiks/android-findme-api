(function (exports) {
    'use strict';

    var crypto = require('crypto');

    exports.hash = function (password, callback) {
        crypto.randomBytes(32, function (err, buf) {
            if (err) {
                callback(err);
                return;
            }

            var salt = buf.toString('hex');

            crypto.pbkdf2(password, salt, 25000, 512, function (err, encodedPassword) {
                callback(err, encodedPassword, salt);
            });
        });
    };

    exports.validatePassword = function (password, hash, salt, callback) {
        crypto.pbkdf2(password, salt, 25000, 512, function (err, encodedPassword) {
            callback(err, hash.toString('hex') === encodedPassword.toString('hex'));
        });
    };
})(module.exports);
