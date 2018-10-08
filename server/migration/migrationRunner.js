let fs = require('fs');

const mongoose = require('mongoose'),
    async = require('async'),
    model = require('../models/migration');

exports.migrate = function (callback) {

    var files = [];

    fs.readdir(__dirname +'/scripts', function (err, items) {

        if (err) {
            return callback(err);
        }

        for (var i = 0; i < items.length; i++) {
            var fileName = items[i].split('.js');
            files.push(fileName[0]);
        }

        files.sort();

        async.eachSeries(files, function (entry, fileCallBack) {

            let migrationTask = [];

            model.find({}, function (err, migrations) {

                if (!migrations) {
                    return callback(new Error('Migration is undefined in migration process'));
                }

                for (var i = 0; i < migrations.length; i++) {

                    var migrationItem = migrations[i].filename;
                    migrationTask.push(migrationItem);
                }

                if (!migrationTask.includes(entry)) {
                    let migrationInst = require('./scripts/'+entry);
                    migrationInst.migrate(fileCallBack);
                } else {
                    fileCallBack();
                }

            });

        }, function(err){
            callback(err);
        });
    });
};