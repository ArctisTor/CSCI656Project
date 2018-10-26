const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let messageSchema = new Schema(
    {
        username: String,
        message: String,
        channels: [String],
        read: Boolean
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('Message', messageSchema, 'message');