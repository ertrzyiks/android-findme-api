(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        refreshTokenSchema = require('../schema/refresh_token');

    module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
})(module);
