const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { EXPIRES_IN } = require('../configs/constants');

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

function createUploadPath() {
    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth() + 1);
    const day = String(new Date().getDate());
    const uploadPath = path.join(__dirname, "..", "..", "public", "uploads", year, month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join("public", "uploads", year, month, day);
}

module.exports = {
    hashString,
    compareStringWithHash,
    tokenGenerator,
    verifyToken,
    createUploadPath,
}