const { body } = require("express-validator");
const path = require("path");

function imageValidator() {
    return [
        body("image").custom((image, { req }) => {
            if (!req.file) throw "please choose a image";
            const ext = path.extname(req.file.path);
            const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
            if (!exts.includes(ext)) throw "the format sent is not correct";
            const maxSize = 3 * 1024 * 1024;
            if (req.file.size > maxSize) throw "the size of the file cannot be more than 3 MB";
            return true;
        })
    ]
}

module.exports = {
    imageValidator,
}