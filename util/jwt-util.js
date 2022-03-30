const jwt = require("jsonwebtoken");
const signToken = async (data) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};
const verifyToken = async (data, token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};
