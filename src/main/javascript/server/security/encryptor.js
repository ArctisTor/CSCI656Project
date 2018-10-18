var util = require('util'),
    enc = require('./encryptor-lib'),
    dc = require('./decryptor-lib');

console.log('Enter text to encrypt');
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(text) {
   console.log(enc.encrypt(text));
   console.log('decrypted text: ' + dc.decypt(enc.encrypt(text)));
   process.exit();
});