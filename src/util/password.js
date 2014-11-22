(function (exports) {
    'use strict';

    var bcrypt = require('bcrypt');

    exports.hash = function (password, callback) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                callback(err, hash);
            });
        });
    };
})(module.exports);
