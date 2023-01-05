const path = require("path");
const { createUploadPath } = require("./utils");

const uploadFile = async (req, res, next) => {
    try {
        if (req.file || Object.keys(req.files).length == 0) throw { status: 400, message: "please choose a image" };
        const image = req.files.image;
        const type = path.extname(image.name);
        if (![".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(type)) throw { status: 400, message: "the format sent is not correct" }
        const image_path = path.join(createUploadPath(), (Date.now() + type));
        req.body.image = `${req.protocol}://${req.get("host")}/${image_path.substring(7).replace(/\\/g, "/")}`;
        const uploadPath = path.join(__dirname, "..", "..", image_path);
        image.mv(uploadPath, (err) => {
            if (err) throw { status: 400, message: "image not uploaded" };
            next();
        })
    } catch (error) {
        next(error);
    }
}

module.exports = uploadFile;