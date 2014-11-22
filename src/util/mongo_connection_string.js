(function (module) {
    'use strict';

    module.exports = function (config) {
        config = config || {};

        var host = config.host || 'localhost',
            dbname = config.dbname || 'test',
            authPart = '',
            passwordPart = '';

        if (config.username) {
            if (config.password) {
                passwordPart = ':' + config.password;
            }
            authPart = config.username + passwordPart + "@";
        }

        return 'mongodb://' + authPart + host + '/' + dbname;
    };
})(module);
