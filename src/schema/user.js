(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        userSchema = new Schema({
            username: {
                type: String,
                required: '{PATH} is required',
                trim: true
            },
            created_at: {
                type: Number
            },
            updated_at: {
                type: Number
            }
        });

    userSchema.pre('save', function (next) {
        var now = (new Date()).getTime();
        this.updated_at = now;

        if (!this.created_at) {
            this.created_at = now;
        }

        next();
    });

    userSchema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });

    module.exports = userSchema;
})(module);
