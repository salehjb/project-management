const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { EXPIRES_IN } = require('../configs/constants')

function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(str, salt);
    return hash;
}

function compareStringWithHash(str, hash) {
    return bcrypt.compareSync(str, hash);
}

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: EXPIRES_IN });
    return token;
}

function verifyToken(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (result.username) throw { status: 401, message: "please login to your account" };
    return result;
}

module.exports = {
    hashString,
    compareStringWithHash,
    tokenGenerator,
    verifyToken,
}