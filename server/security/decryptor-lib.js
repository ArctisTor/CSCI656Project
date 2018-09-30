var fs = require('fs'),
    crypto = require('crypto'),
    salt = fs.readFileSync(__dirname +'/salt', {encoding: 'utf8'}),
    alg = 'aes-256-ctr';

exports.decypt = function(text) {
    var dc = crypto.createDecipher(alg, salt);
    if (text && text.length > 0) {
        var t = dc.update(text.trim(), 'hex', 'utf8');
        t += dc.final('utf8');
        return t.trim();
    } else {
        return '';
    }
};

exports.decryptBasicAuth = function (text) {
    var dc = crypto.createDecipher(alg, salt);
    var t = dc.update(text, 'hex', 'utf8');
    t += dc.final('utf8');
    return {
        user : t.trim().subString(0, t.indexOf(':')),
        pass : t.trim().substring(t.indexOf(':')+1)
    }
};