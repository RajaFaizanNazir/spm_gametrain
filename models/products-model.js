console.log("./products-model.js");
const fs = require("fs");

const add = function (body, path = "./data/products.json") {
  console.log("add()");
  objs = get(path);
  objs.push(body);
  console.log("All OBJS");
  console.log(objs);
  str = JSON.stringify(objs);
  //str = str.replaceAll('\\', "");
  str = str.split('\\').join('')
  str = str.replace('"{', "{");
  str = str.replace('}"', "}");
  fs.writeFileSync(path, str);
};
const get = function (path = "./data/products.json") {
  console.log("get()");
  const data = JSON.parse(
    fs.readFileSync(path, { encoding: "utf8", flag: "r" })
  );
  return data;
};
module.exports = {
  add,
  get,
};
