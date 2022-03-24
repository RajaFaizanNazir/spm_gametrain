console.log("./app.js");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin-routes");
const clintRoutes = require("./routes/clint-routes");
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(adminRoutes);
server.use(clintRoutes);

server.listen(port, () => {
  console.log("Server running on port: http://localhost:" + port);
});
module.exports = { express, server, bodyParser };
console.log("App.js");
