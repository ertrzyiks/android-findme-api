(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        refreshTokenTTL = 31 * 24 * 60 * 60 * 1000,
        refreshTokenSchema = new Schema({
            token: {
                type: String
            },
            user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            client_id: {
                type: Schema.Types.ObjectId,
                ref: 'Client'
            },
            scope: [
                {
                    type: String
                }
            ],
            expires: {
                type: Number,
                default: function () {
                    var today = new Date();

                    return new Date(today.getTime() + refreshTokenTTL).getTime();
                }
            },
            active: {
                type: Boolean,
                get: function (value) {
                    if (this.expires < new Date() || !value) {
                        return false;
                    } else {
                        return value;
                    }
                },
                default: true
            }
        });

    module.exports = refreshTokenSchema;
})(module);
