(function (module) {
    'use strict';

    module.exports = function (config) {
        var connectionString = config.host + '/' + config.dbname;

        if (config.username) {
            if (config.password) {
                connectionString = config.username + ":" + config.password + "@" + connectionString;
            } else {
                connectionString = config.username + "@" + connectionString;
            }
        }

        return 'mongodb://' + connectionString;
    };
})(module);
