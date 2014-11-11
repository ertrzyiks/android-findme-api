var myStepDefinitionsWrapper = function () {
    this.World = require("../support/world.js").World;

    this.Given(/^I am an API client$/, function(callback) {
        callback();
    });

    this.When(/^the client requests GET "([^"]*)"$/, function(arg1, callback) {
        callback();
    });

    this.When(/^the response should be a "([^"]*)" with JSON:$/, function(arg1, string, callback) {
        callback();
    });
};

module.exports = myStepDefinitionsWrapper;
