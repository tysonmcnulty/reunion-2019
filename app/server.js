const express = require("express");

const app = express();

app.use(express.json());

app.post("/api/registration", function(req, res) {
  console.log("WE GOT YOU:", req.body);

  res.status(202).send();
});

module.exports = app;
