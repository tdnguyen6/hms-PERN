const crypto = require('crypto');
exports.do_hash = (s) => crypto.createHash('md5').update(s).digest('hex');