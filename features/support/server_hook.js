var myAfterHooks = function () {
    this.Around(function(runScenario) {
        var server = require('../../');

        runScenario(function(callback) {
            server.close();

            callback();
        });
    });
}

module.exports = myAfterHooks;
