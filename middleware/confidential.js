console.log("./confidential.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const encript = (password) => {
  console.log("encript()");
  return bcrypt.hashSync(password, saltRounds, function (err, hash) {});
};
const isSame = (password, hash) => {
  console.log("isSame()");
  return bcrypt.compareSync(password, hash, function (err, result) {});
};
module.exports = { encript, isSame };
