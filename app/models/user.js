const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [Types.ObjectId], default: [] },
    role: { type: String, default: "USER", required: true },
}, { timestamps: true });

const UserModel = model("users", UserSchema);

module.exports = UserModel;