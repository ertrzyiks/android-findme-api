(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        RoomSchema = new Schema({
            name: {
                type: String,
                required: '{PATH} is required',
                trim: true
            },
            password: { type: String },
            created_at: { type: Number },
            updated_at: { type: Number }
        });

    RoomSchema.pre('save', function (next) {
        var now = (new Date()).getTime();
        this.updated_at = now;

        if (!this.created_at) {
            this.created_at = now;
        }
        next();
    });

    RoomSchema.virtual('is_public').get(function () {
        return !this.password;
    });

    RoomSchema.set('toJSON', {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    });

    module.exports = mongoose.model('Room', RoomSchema);
})(module);
