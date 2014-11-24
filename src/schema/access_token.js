(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        accessTokenTTL = 60 * 60 * 1000,
        accessTokenSchema = new Schema({
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
            expires:
            {
                type: Number,
                default: function () {
                    var today = new Date();

                    return new Date(today.getTime() + accessTokenTTL).getTime();
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

    module.exports = accessTokenSchema;
})(module);
