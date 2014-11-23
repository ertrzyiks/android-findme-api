(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        clientSchema = require('../schema/client');

    module.exports = mongoose.model('Client', clientSchema);
})(module);
