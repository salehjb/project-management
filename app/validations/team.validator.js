import { body } from "express-validator";
// models
import TeamModel from "../models/team.model.js"

export function createTeamValidator() {
  return [
    body("name").notEmpty().withMessage("team name cannot be empty"),
    body("username").notEmpty().isLength({ min: 5, max: 20 }).withMessage("team username cannot be empty and cannot be less than 5 or more than 20 characters").custom(async (username, ctx) => {
      const teamExistWithUsername = await TeamModel.findOne({ username });
      if (teamExistWithUsername) throw "username already in use";
      return true;
    })
  ]  
}