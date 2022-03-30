const jwt = require("jsonwebtoken");
const signToken = async (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};
const verifyToken = async (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};
module.exports = {
  signToken,
  verifyToken,
};
