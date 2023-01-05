const { Schema, model, Types } = require("mongoose");

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "http://localhost:3500/defaults/default.png" },
    owner: { type: Object, required: true },
    team: { type: Types.ObjectId },
    private: { type: Boolean, default: true },
})

const ProjectModel = model("projects", ProjectSchema);

module.exports = ProjectModel;