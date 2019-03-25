import { RadioGroup, Radio } from "react-radio-group";
import React from "react";
import PaypalButton from "./PaypalButton";
import "./Registration.css";

const kebabify = text => {
  return text
    .toLowerCase()
    .split(" ")
    .join("-");
};

const priceForOption = {
  individual: "125.00",
  pair: "225.00",
  couple: "225.00"
};

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      option: ""
    };
  }

  renderField = ({ labelText }) => (
    <div className="form-field">
      <label htmlFor={kebabify(labelText)}>{labelText}</label>
      <input id={kebabify(labelText)} />
      <span />
    </div>
  );

  renderForm = () => {
    const Field = this.renderField;

    switch (this.state.option) {
      case "individual":
        return (
          <>
            <h3>My Information</h3>
            <div>
              <Field labelText="First Name" />
              <Field labelText="Last Name" />
              <Field labelText="Email" />
              <Field labelText="T-Shirt Size" />
            </div>
          </>
        );
      case "pair":
      case "couple":
        return (
          <>
            <h3>My Information</h3>
            <div id="attendee-1">
              <Field labelText="First Name" />
              <Field labelText="Last Name" />
              <Field labelText="Email" />
              <Field labelText="T-Shirt Size" />
            </div>
            <h3>My Guest's Information</h3>
            <div id="attendee-2">
              <Field labelText="First Name" />
              <Field labelText="Last Name" />
              <Field labelText="Email" />
              <Field labelText="T-Shirt Size" />
            </div>
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
          Just me
        </label>
        <label className="option">
          <Radio value="pair" />
          Me and another alum
        </label>
        <label className="option">
          <Radio value="couple" />
          Me and a plus-one (non-alum)
        </label>
      </div>
    </RadioGroup>
  );

  render() {
    const Options = this.renderOptions;
    const Form = this.renderForm;
    const option = this.state.option;
    const price = priceForOption[option];

    return (
      <div className="form" id="registration-form">
        <h3>Who's registering?</h3>
        <Options />
        {option && (
          <>
            <Form />
            <h3>Price: ${price}</h3>
            <PaypalButton
              id="paypal-button"
              amount={price}
              onSuccess={this.props.onSuccess}
            />
          </>
        )}
      </div>
    );
  }
}

export default Registration;
