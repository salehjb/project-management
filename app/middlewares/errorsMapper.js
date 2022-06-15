import { validationResult } from "express-validator";

export function expressValidatorMapper(req, res, next) {
  let messages = {};
  const result = validationResult(req);
  if (result.errors.length > 0) {
    result.errors.map(error => {
      messages[error.param] = error.msg;
    });
    return res.status(400).json({ status: 400, success: false, messages });
  }
  next()
}