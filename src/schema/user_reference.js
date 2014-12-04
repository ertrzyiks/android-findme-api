(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        userReferenceSchema = new Schema({
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            username: {
                type: String
            },
            created_at: {
                type: Number
            },
            updated_at: {
                type: Number
            }
        });

    userReferenceSchema.pre('save', function (next) {
        var now = (new Date()).getTime();
        this.updated_at = now;

        if (!this.created_at) {
            this.created_at = now;
        }

        next();
    });

    userReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });

    module.exports = userReferenceSchema;
})(module);
