const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedto: { type: mongoose.Types.ObjectId, ref: "User" },
    under: { type: mongoose.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["OPEN", "PENDING APPROVAL", "COMPLETE"],
      default: "OPEN",
    },
  },
  {
    timeseries: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
