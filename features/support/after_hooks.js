(function () {
    'use strict';

    var myAfterHooks = function () {
        /*jshint validthis:true */

        this.After(function (callback) {
            this.clearResponse();

            callback();
        });
    };

    module.exports = myAfterHooks;
})();
