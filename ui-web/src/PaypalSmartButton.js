import React, { Component } from "react";
import PropTypes from "prop-types";

class PaypalSmartButton extends Component {
  getCurrentAmount = () => {
    return this.props.amount;
  };

  async componentDidMount() {
    const { id, onSuccess } = this.props;
    const getCurrentAmount = this.getCurrentAmount;

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
                  value: getCurrentAmount()
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
