var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    roomSchema = new Schema({
        name: { type: String },
        is_public: { type: Boolean },
        password: { type: String }
    });

module.exports = mongoose.model('Room', roomSchema);
