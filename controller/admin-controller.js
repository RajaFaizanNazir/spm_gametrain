console.log("./admin-controller.js");
const productsModel = require("../models/products-model");
const validator = require("../middleware/validate.js");

const addGet = (req, res) => {
  console.log("addGet()");
  res.send({ Page: "Add Products" });
};
const addPost = (req, res) => {
  console.log("addPost()");
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    body = JSON.stringify(req.body);
    console.log(body);
    productsModel.add(body);
    console.log("Add-Admin");
    console.log(body);
    res.send({ Status: "Request Recived" });
  } else {
    res.send({
      Singup: "Un-Successful",
      Discription: "Esentials Entities are missing, not invalid",
      Validator: errors.array(),
    });
  }
};

module.exports = { addGet, addPost };
