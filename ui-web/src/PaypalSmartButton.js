import React, { Component } from "react";
import PropTypes from "prop-types";

class PaypalSmartButton extends Component {
  async componentDidMount() {
    const { id, amount, onSuccess } = this.props;

    window.paypal
      .Buttons({
        createOrder(data, actions) {
          // Set up the transaction
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount
                }
              }
            ]
          });
        },
        onApprove(data, actions) {
          return actions.order.capture().then(onSuccess);
        },
        onError(err) {
          console.error("!!!!!!!!", err);
        }
      })
      .render(`#${id}`);
  }

  render() {
    return <div className="width-limited" id={this.props.id} />;
  }
}

PaypalSmartButton.propTypes = {
  id: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default PaypalSmartButton;
