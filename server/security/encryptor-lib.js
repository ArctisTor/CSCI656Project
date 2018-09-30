var fs = require('fs'),
    crypto = require('crypto'),
    salt = fs.readFileSync(__dirname + '/salt', {encoding: 'utf8'}),
    alg = 'aes-256-ctr';

exports.encrypt = function(text) {
    var c = crypto.createCipher(alg, salt);
    var t = c.update(text, 'utf8', 'hex');
    t+= c.final('hex');
    return t;
}