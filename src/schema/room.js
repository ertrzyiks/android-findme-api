(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        passwordUtil = require('../util/password'),
        Schema = mongoose.Schema,
        userReferenceSchema = require('./user_reference'),
        roomSchema = new Schema({
            name: {
                type: String,
                required: '{PATH} is required',
                trim: true
            },
            users: {
                type: [userReferenceSchema],
                default: [],
                select: false
            },
            password: {
                type: String
            },
            created_at: {
                type: Number
            },
            updated_at: {
                type: Number
            }
        });

    roomSchema.pre('save', function (next) {
        var now = (new Date()).getTime();
        this.updated_at = now;

        if (!this.created_at) {
            this.created_at = now;
        }

        if (this.password) {
            passwordUtil.hash(this.password, function (err, hash) {
                this.password = hash;
                next();
            }.bind(this));
        } else {
            next();
        }
    });

    roomSchema.virtual('is_public').get(function () {
        return !this.password;
    });

    roomSchema.set('toJSON', {
        virtuals: true,

        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    });

    module.exports = roomSchema;
})(module);
