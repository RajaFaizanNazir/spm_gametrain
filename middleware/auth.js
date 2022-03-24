console.log("./auth.js");
const fs = require("fs");
const model = require("../models/credentials-model.js");
const confidential = require("../middleware/confidential.js");

const correct = function (userid, password) {
  console.log("correct()");
  if (model.read()[userid] != undefined)
    return confidential.isSame(password, model.read()[userid]);
  return false;
};
module.exports = { correct };
