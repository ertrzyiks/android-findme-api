(function () {
    'use strict';

    var myBeforeHooks = function () {
        /*jshint validthis:true */

        this.Before(function (callback) {
            this.client = {};

            this.setAccessToken(null);
            this.setRefreshToken(null);

            this.clearResponse();

            callback();
        });
    };

    module.exports = myBeforeHooks;
})();
