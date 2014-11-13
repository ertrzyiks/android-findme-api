var myAfterHooks = function () {
    this.After(function(callback) {
        this.clearResponse();

        callback();
    });
}

module.exports = myAfterHooks;
