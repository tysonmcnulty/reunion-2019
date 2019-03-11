import React from "react";
import PaypalButton from "./PaypalButton";
import "./RegistrationForm.css";

class RegistrationForm extends React.Component {
  render() {
    return (
      <div className="form" id="registration-form">
        <h2>Click below to register!</h2>
        <h3>Price: $125.00</h3>
        <PaypalButton id="paypal-button" amount="125.00" />
      </div>
    );
  }
}

export default RegistrationForm;
