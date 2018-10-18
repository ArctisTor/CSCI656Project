const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema(
    {
        userId : String,
        tokenKey : String
    },
    {
        timestamp: true
    }
    );

module.exports = mongoose.model('authorizationToken', requestSchema, 'authorizationToken');