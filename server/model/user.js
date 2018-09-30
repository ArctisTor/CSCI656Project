const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema(
    {
        username: String,
        pasword: String,
        channels: [String]
    },
    {
        timestamps: true
    }

);

model.exports = mongoose.model('User', requestSchema, 'users');