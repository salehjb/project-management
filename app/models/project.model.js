import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true },
  team: { type: mongoose.Types.ObjectId, required: true },  
  private: { type: Boolean },
  tags: { type: [String], default: [] },
}, { timestamps: true });

const ProjectModel = mongoose.model("project", ProjectSchema);

export default ProjectModel;