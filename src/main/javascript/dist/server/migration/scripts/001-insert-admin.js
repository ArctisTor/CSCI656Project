const migration = require('../../models/migration'),
    User = require('../../models/user'),
    encrypt = require('../../security/encryptor-lib')
    async = require('async'),
    path = require('path');

exports.migrate = function(callback) {

    let post;

    async.series([

        function (asyncCallback) {

            post = new User(
                {
                    username: 'server-admin',
                    password: encrypt.encrypt('pa$$w0rdCW@L'),
                    channels: ['general']
                });
            post.save(asyncCallback);
        }

    ], function(err) {

        var fileName = path.basename(__filename).split('.js');
        let userPost = new migration();
        userPost.filename = fileName[0];
        userPost.save(callback);

    })

}