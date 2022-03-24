console.log("./credentials-model.js");
const fs = require("fs");
const confidential = require("../middleware/confidential.js");

const write = function (body, path = "./data/credentials.json") {
  console.log("write()");
  objs = read(path);
  console.log("OBJS");
  console.log(objs);
  objs[body.userid] = confidential.encript(body["password"]);
  console.log(objs);
  fs.writeFileSync(path, JSON.stringify(objs));
};

const read = function (path = "./data/credentials.json") {
  console.log("read()");
  return JSON.parse(fs.readFileSync(path, { encoding: "utf8", flag: "r" }));
};

module.exports = {
  write,
  read,
};
