const { body } = require("express-validator");

function createProjectValidator() {
    return [
        body("title").isLength({ min: 3, max: 20 }).withMessage("the title of the project cannot be less than 3 and more than 20 characters"),
        body("description").isLength({ min: 20 }).withMessage("the description of the project cannot be less than 20 characters"),
    ]
}

module.exports = {
    createProjectValidator,
}