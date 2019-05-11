const express = require("express");
const registrationApi = require("./registrationApi");

const app = express();

app.use(express.json());

app.use("/api/registration", registrationApi);

module.exports = app;
