import mongoose from "mongoose";

const InviteRequests = new mongoose.Schema({
  teamId: { type: mongoose.Types.ObjectId, required: true },
  caller: { type: String, required: true, lowercase: true },
  status: { type: String, default: "pending" }
}, { timestamps: true }); 

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_image: { type: String, default: "user_profile.jpg" },
  token: { type: String, default: "" },
  teams: { type: [mongoose.Types.ObjectId], default: [] },
  skills: { type: [String], default: [] },
  role: { type: String, default: "USER" },
  invite_requests: { type: [InviteRequests] }
}, { timestamps: true });

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;