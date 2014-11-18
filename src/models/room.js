(function (module) {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        RoomSchema = new Schema({
            name: { type: String },
            is_public: { type: Boolean },
            password: { type: String }
        });

    RoomSchema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    });

    module.exports = mongoose.model('Room', RoomSchema);
})(module);
