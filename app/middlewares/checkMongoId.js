const { isValidObjectId } = require("mongoose")

function checkMongoId(req, res, next) {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) throw { status: 400, message: "the id sent is not correct" };

        next()
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkMongoId
}