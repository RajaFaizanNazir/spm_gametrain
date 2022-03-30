const jwt = require("./util/jwt-util");
const token = await jwt.signToken({ email: "RFaizanN@gmail.com" });
const gotToken = await jwt.signToken(token);
console.log(token);
console.log(gotToken);
