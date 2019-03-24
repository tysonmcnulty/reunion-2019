const express = require("express");
const braintree = require("braintree");

const app = express();

app.use(express.json());

const gateway = braintree.connect({
  accessToken: process.env["BRAINTREE_ACCESS_TOKEN"]
});

app.get("/client_token", function(req, res) {
  gateway.clientToken.generate({}, function(err, response) {
    res.send({
      clientToken: response.clientToken
    });
  });
});

const makeSaleRequest = (amount, nonce) => ({
  amount,
  merchantAccountId: "USD",
  paymentMethodNonce: nonce,
  descriptor: {
    name: "BTW2004*Reunion 2019"
  },
  options: {
    paypal: {
      description: "BTW Class of 2004 15th Reunion"
    },
    submitForSettlement: true
  }
});

app.post("/checkout", function(req, res) {
  const { amount, nonce } = req.body;

  console.log(`Processing request for nonce: ${nonce} (amount: ${amount})`);

  gateway.transaction.sale(makeSaleRequest(amount, nonce), function(
    error,
    result
  ) {
    if (error) {
      res.send({ status: "transaction error", error });
    } else if (result.success) {
      res.send({
        status: "transaction successful",
        transaction: result.transaction
      });
    } else {
      res.send({ status: "transaction unsuccessful", result });
    }
  });
});

module.exports = app;
