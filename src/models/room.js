(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        roomSchema = require('../schema/room');

    module.exports = mongoose.model('Room', roomSchema);
})(module);
