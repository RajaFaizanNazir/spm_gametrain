const mongoose = require("mongoose");
/**************************************** */
const Schema = mongoose.Schema;
/**************************************** */
const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Types.ObjectId, ref: "User" },
    under: { type: mongoose.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["OPEN", "PENDING APPROVAL", "COMPLETE"],
      default: "OPEN",
    },
  },
  {
    timestamps: true,
  }
);
/**************************************** */
module.exports = mongoose.model("Task", taskSchema);
