const express = require("express");
const cfenv = require("cfenv");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());

const saveIfDbConnected = registration => {
  const appEnv = cfenv.getAppEnv();
  if (!appEnv) {
    console.log("App env not detected; aborting save");
    return;
  }

  const mongoCreds = appEnv.getServiceCreds("btw-mongo");
  if (!mongoCreds.uri) {
    console.log("Mongo URI not found; aborting save");
    return;
  }

  const client = new MongoClient(mongoCreds.uri, { useNewUrlParser: true });

  client.connect(function(err) {
    if (err) {
      console.error("Error connecting to Mongo:", err);
    } else {
      console.log("Connected successfully to Mongo");

      const db = client.db(mongoCreds.database);
      const collection = db.collection("registrations");

      collection.insertOne(registration, function(err, result) {
        if (err) {
          console.error("Error saving to collection:", err);
        } else {
          console.log("Save successful");
        }
        client.close();
      });
    }
  });
};

app.post("/api/registration", function(req, res) {
  const registration = req.body;

  console.log("WE GOT YOU");
  console.log(registration);

  saveIfDbConnected(registration);

  res.status(202).send();
});

module.exports = app;
