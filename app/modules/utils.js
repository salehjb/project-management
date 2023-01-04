const bcrypt = require('bcrypt');

function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(str, salt);
    return hash;
}

module.exports = {
    hashString,
}