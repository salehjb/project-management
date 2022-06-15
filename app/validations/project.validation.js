import { body } from "express-validator";

export function createProjectValidator() {
  return [
    body("title").notEmpty().withMessage("the project title cannot be empty"),
    body("text").notEmpty().withMessage("the project text cannot be empty"),
    body("tags").isArray({ min: 0, max: 10 }).withMessage("the number of tags should not exceed 10")
  ]  
}