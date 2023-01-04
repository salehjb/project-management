const { Schema, model, Types } = require("mongoose");

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "/defaults/default.png" },
    owner: { type: Types.ObjectId, required: true },
    team: { type: Types.ObjectId, required: true },
    private: { type: Boolean, default: true },
})

const ProjectModel = model("projects", ProjectSchema);

module.exports = ProjectModel;