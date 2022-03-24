console.log("./clint-controller.js");
const auth = require("../middleware/auth.js");
const productsModel = require("../models/products-model.js");
const credentialsModel = require("../models/credentials-model.js");
const validator = require("../middleware/validate.js");

const signupGet = (req, res) => {
  console.log("signupGet()");
  res.send({ Page: "Signup" });
};

const signupPost = (req, res) => {
  console.log("signupPost()");
  body = req.body;
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    console.log("Password Length is also valid");
    credentialsModel.write(body);
    console.log("Email and Password Meets the criteria");
    res.send({
      Singup: "Successful",
      Discription: "Email and Password Meets the criteria",
    });
  } else {
    console.log("Email or Password or Both does not Meets the criteria");
    console.log("Try again");
    res.send({
      Singup: "Un-Successful",
      Discription: "Email or Password or Both does not Meets the criteria",
      Validator: errors.array(),
    });
  }
};

const loginGet = (req, res, next) => {
  console.log("loginGet()");
  res.send({ Page: "Login" });
  next();
};

const loginPost = (req, res) => {
  console.log("loginPost()");
  body = req.body;
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    flag = auth.correct(body["userid"], body["password"]);
    st = "";
    if (flag == true) {
      st = "Login Successful";
    } else {
      st = "Login Un-Successful, Password or Email not match";
    }
    console.log();
    res.send({ Status: st });
  } else {
    console.log("Try again");
    res.send({
      Singup: "Un-Successful",
      Discription: "Email or Password or Both does not Meets the criteria",
      Validator: errors.array(),
    });
  }
};

const view = (req, res) => {
  console.log("view()");
  res.send(productsModel.get());
};

const searchBy = (req, res) => {
  data = productsModel.get();
  const filters = req.query;
  const filteredUsers = data.filter((user) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
};

const searchByPriceRange = (req, res) => {
  data = productsModel.get();
  const min = req.query.min;
  const max = req.query.max;
  newData = data.filter((ob) => {
    return (
      parseInt(ob.price) >= parseInt(min) && parseInt(ob.price) <= parseInt(max)
    );
  });
  res.send(newData);
};

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  view,
  searchBy,
  searchByPriceRange,
};
