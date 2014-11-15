var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    userSchema = new Schema({
        _id: Schema.Types.Mixed,
        username: { type: String }
    });

module.exports = mongoose.model('User', userSchema);
