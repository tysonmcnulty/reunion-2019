import React, { Component } from "react";
import PropTypes from "prop-types";
import paypal from "paypal-checkout";
import client from "braintree-web/client";
import paypalCheckout from "braintree-web/paypal-checkout";

const env = "sandbox";

class PaypalButton extends Component {
  async componentDidMount() {
    const { clientToken } = await fetch("/client_token", {
      headers: {
        Accept: "application/json"
      },
      credentials: "same-origin"
    }).then(response => response.json());

    const { amount, onSuccess } = this.props;

    paypal.Button.render(
      {
        braintree: {
          client,
          paypalCheckout
        },
        client: {
          [env]: clientToken
        },
        env,
        commit: true,
        payment: (data, actions) => {
          return actions.braintree.create({
            flow: "checkout",
            amount,
            currency: "USD",
            enableShippingAddress: false
          });
        },
        onAuthorize: async payload => {
          const response = await fetch("/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({
              amount: this.props.amount,
              nonce: payload.nonce
            })
          }).then(response => response.json());

          onSuccess(response);
        }
      },
      this.props.id
    );
  }

  render() {
    return <div id={this.props.id} />;
  }
}

PaypalButton.propTypes = {
  id: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default PaypalButton;
