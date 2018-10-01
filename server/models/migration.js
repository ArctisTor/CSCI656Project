const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let migrationSchema = new Schema(
    {
        filename : String
    },
    {
       timestamp: true
    });

module.exports = mongoose.model('Migration', migrationSchema, 'migration');