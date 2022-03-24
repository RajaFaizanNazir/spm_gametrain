const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//const uuid = require("uuid");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    dob: { type: Date },
    tpye: {
      type: String,
      enum: ["PM", "DEV"],
      default: "DEV",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
