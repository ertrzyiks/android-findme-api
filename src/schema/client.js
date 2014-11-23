(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        clientSchema = new Schema({
            title: {
                type: String
            },
            oauth_secret: {
                type: String
            }
        });

    module.exports = clientSchema;
})(module);
