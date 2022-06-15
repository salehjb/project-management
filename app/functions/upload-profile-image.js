import multer from "multer";
import path from "path";
// functions => upload-profile-image
import { createUploadPath } from "./public.js";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, createUploadPath());
  },
  filename: (req, file, callback) => {
    const type = path.extname(file.originalname);
    callback(null, Date.now() + type);
  }
});

const uploadProfileImage = multer({ storage });

export default uploadProfileImage;