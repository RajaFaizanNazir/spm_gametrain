const invalidRequest = (req, res) => {
  res.send({ Status: "Not Valid Request" });
};
module.exports = { invalidRequest };
