(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        userSchema = require('../schema/user');

    module.exports = mongoose.model('User', userSchema);
})(module);
