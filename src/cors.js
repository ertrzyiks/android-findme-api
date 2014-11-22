(function (module) {
    'use strict';

    var cors = require('cors');

    module.exports = cors({
        credentials: true,

        origin: function (origin, callback) {
            if (origin === undefined) {
                callback(null, false);
            } else {
                var match = origin.match("^(.*)?.wordnik.com(:[0-9]+)?"),
                    allowed = (match !== null && match.length > 0);

                callback(null, allowed);
            }
        }
    });
})(module);
