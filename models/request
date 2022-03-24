const mongoose = require("mongoose");
/**************************************** */
const Schema = mongoose.Schema;
/**************************************** */
const requestSchema = new Schema(
  {
    devComments: { type: String},
    pmComments: { type: String},
    taskid: { type: mongoose.Types.ObjectId, ref: "Task" },
    status: {
      type: String,
      enum: ["ACCEPTED", "PENDING APPROVAL", "REJECTED"],
      default: "PENDING APPROVAL",
    },
  },
  {
    timeseries: true,
  }
);
/**************************************** */
module.exports = mongoose.model("Request", requestSchema);
