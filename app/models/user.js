const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    profile_image: { type: String, default: "http://localhost:3500/defaults/default.png" },
    role: { type: String, default: "USER", required: true },
    token: { type: String, default: "", required: true },
}, { timestamps: true });

const UserModel = model("users", UserSchema);

module.exports = UserModel;