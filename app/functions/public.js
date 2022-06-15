import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export function __filename(path) {
  return fileURLToPath(path);
}

export function __dirname(path) {
  return dirname(__filename(path));
}

export function hashString(str) {
  const salt = bcrypt.genSaltSync(15);
  const hashed = bcrypt.hashSync(str, salt);
  return hashed;
}

export function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
  return token;
}

export function verifyToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result.username) throw { status: 401, message: "please login to your account" };
  return result;
}

export function createUploadPath() {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();

  const uploadPath = path.join(__dirname(import.meta.url), "..", "..", "public", "uploads", year, month, day)
  fs.mkdirSync(uploadPath, { recursive: true });

  return path.join("public", "uploads", year, month, day)
}
