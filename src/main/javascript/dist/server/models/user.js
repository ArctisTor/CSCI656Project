const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema(
    {
        username: String,
        password: String,
        channels: [String]
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('User', requestSchema, 'users');