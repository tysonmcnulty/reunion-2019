const express = require("express");
const morgan = require("morgan");
const registrationApi = require("./registrationApi");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/registration", registrationApi);

module.exports = app;
