import React from "react";
import PaypalButton from "./PaypalButton";
import "./RegistrationForm.css";

class RegistrationForm extends React.Component {
  render() {
    return (
      <div className="form" id="registration-form">
        <div className="form-field">
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" />
          <span />
        </div>
        <div className="form-field">
          <label htmlFor="last-name">Last Name</label>
          <input id="last-name" />
          <span />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" />
          <span />
        </div>
        <h3>Price: $125.00</h3>
        <PaypalButton id="paypal-button" amount="125.00" />
      </div>
    );
  }
}

export default RegistrationForm;
