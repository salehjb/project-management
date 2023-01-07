const { body, param } = require("express-validator");
const TeamModel = require("../models/team");

function createTeamValidator() {
    return [
        body("username").isLength({ min: 5 }).withMessage("the name of the team cannot be less than 5 characters").custom(async (username, ctx) => {
            const team = await TeamModel.findOne({ username });
            if (team) throw `team with username ${username} is already exists`;
            return true;
        }),
        body("name").isLength({ min: 5 }).withMessage("the name of the team cannot be less than 5 characters"),
        body("description").isLength({ min: 10 }).withMessage("the description of the team cannot be less than 10 characters"),
    ]
}

module.exports = {
    createTeamValidator
}