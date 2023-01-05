const multer = require('multer');
const path = require('path');
const { createUploadPath } = require('./utils');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createUploadPath());
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, Date.now() + extension)
    },
});

const upload = multer({ storage });

module.exports = upload;