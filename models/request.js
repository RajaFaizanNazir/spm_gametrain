const mongoose = require("mongoose");
/**************************************** */
const Schema = mongoose.Schema;
/**************************************** */
const requestSchema = new Schema(
  {
    devComments: { type: String, required: true },
    pmComments: { type: String, default: "" },
    taskId: { type: mongoose.Types.ObjectId, required: true, ref: "Task" },
    from: { type: mongoose.Types.ObjectId, ref: "User" },
    for: { type: mongoose.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["ACCEPTED", "PENDING APPROVAL", "REJECTED"],
      default: "PENDING APPROVAL",
    },
  },
  {
    timestamps: true,
  }
);
/**************************************** */
module.exports = mongoose.model("Request", requestSchema);
/**************************************** */
