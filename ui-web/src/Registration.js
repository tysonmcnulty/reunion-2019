import { RadioGroup, Radio } from "react-radio-group";
import React from "react";
import PaypalSmartButton from "./PaypalSmartButton";
import "./Registration.css";

const kebabify = text => {
  return text
    .toLowerCase()
    .split(" ")
    .join("-");
};

const detailsForOption = {
  individual: {
    price: "129.04",
    explanation: "($125.00 registration fee + $4.04 PayPal processing fee)"
  },
  pair: {
    price: "232.03",
    explanation: "($225.00 registration fee + $7.03 PayPal processing fee)"
  },
  couple: {
    price: "232.03",
    explanation: "($225.00 registration fee + $7.03 PayPal processing fee)"
  },
  none: {}
};

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      option: "none"
    };
  }

  renderField = ({ labelText, value, onChange }) => (
    <div className="form-field">
      <label htmlFor={kebabify(labelText)}>{labelText}</label>
      <input onChange={onChange} value={value} id={kebabify(labelText)} />
      <span />
    </div>
  );

  renderAttendeeInfo = () => {
    const Field = this.renderField;
    const { registration, changeHandlerFor } = this.props;

    return (
      <div id="attendee-info">
        <Field
          value={registration.attendee.firstName}
          onChange={changeHandlerFor("attendee")("firstName")}
          labelText="First Name"
        />
        <Field
          value={registration.attendee.lastName}
          onChange={changeHandlerFor("attendee")("lastName")}
          labelText="Last Name"
        />
        <Field
          value={registration.attendee.email}
          onChange={changeHandlerFor("attendee")("email")}
          labelText="Email"
        />
        <Field
          value={registration.attendee.tShirtSize}
          onChange={changeHandlerFor("attendee")("tShirtSize")}
          labelText="T-Shirt Size"
        />
      </div>
    );
  };

  renderGuestInfo = () => {
    const Field = this.renderField;
    const { registration, changeHandlerFor } = this.props;

    return (
      <div id="guest-info">
        <Field
          value={registration.guest.firstName}
          onChange={changeHandlerFor("guest")("firstName")}
          labelText="First Name"
        />
        <Field
          value={registration.guest.lastName}
          onChange={changeHandlerFor("guest")("lastName")}
          labelText="Last Name"
        />
        <Field
          value={registration.guest.email}
          onChange={changeHandlerFor("guest")("email")}
          labelText="Email"
        />
        {this.state.option === "pair" && (
          <Field
            value={registration.guest.tShirtSize}
            onChange={changeHandlerFor("guest")("tShirtSize")}
            labelText="T-Shirt Size"
          />
        )}
      </div>
    );
  };

  renderForm = () => {
    const AttendeeInfo = this.renderAttendeeInfo;
    const GuestInfo = this.renderGuestInfo;

    switch (this.state.option) {
      case "individual":
        return (
          <>
            <h3>My Information</h3>
            <AttendeeInfo />
          </>
        );
      case "pair":
      case "couple":
        return (
          <>
            <h3>My Information</h3>
            <AttendeeInfo />
            <h3>My Guest's Information</h3>
            <GuestInfo />
          </>
        );
      default:
        return <></>;
    }
  };

  renderOptions = () => (
    <RadioGroup
      id="registration-options"
      selectedValue={this.state.option}
      onChange={value => {
        this.setState({ option: value });
      }}
    >
      <div className="option-group">
        <label className="option">
          <Radio value="individual" />
          <span>Just me</span>
          <span className="left-space">($125.00*)</span>
        </label>
        <label className="option">
          <Radio value="pair" />
          <span>Me and another alum</span>
          <span className="left-space">($225.00*)</span>
        </label>
        <label className="option">
          <Radio value="couple" />
          <span>Me and a non-alum</span>
          <span className="left-space">($225.00*)</span>
        </label>
      </div>
      <p>*Price before payment processing</p>
    </RadioGroup>
  );

  render() {
    const Options = this.renderOptions;
    const Form = this.renderForm;
    const option = this.state.option;
    const { price, explanation } = detailsForOption[option];

    return (
      <div className="form" id="registration-form">
        <h3>Who's registering?</h3>
        <Options />
        {price && (
          <>
            <Form />
            <h2>Price: ${price}</h2>
            <p>{explanation}</p>
            <PaypalSmartButton
              id="paypal-button"
              amount={process.env.REACT_APP_PRICE_OVERRIDE || price}
              onSuccess={this.props.onSuccess}
            />
          </>
        )}
      </div>
    );
  }
}

export default Registration;
