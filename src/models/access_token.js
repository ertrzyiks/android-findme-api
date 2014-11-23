(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        accessTokenSchema = require('../schema/access_token');

    module.exports = mongoose.model('AccessToken', accessTokenSchema);
})(module);
