import { RadioGroup, Radio } from "react-radio-group";
import React from "react";
import PaypalButton from "./PaypalButton";
import "./RegistrationForm.css";

const kebabify = text => {
  return text
    .toLowerCase()
    .split(" ")
    .join("-");
};

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      registrationOption: ""
    };
  }

  renderFormField = ({ labelText }) => (
    <div className="form-field">
      <label htmlFor={kebabify(labelText)}>{labelText}</label>
      <input id={kebabify(labelText)} />
      <span />
    </div>
  );

  renderRegistrationOptions = () => (
    <RadioGroup
      id="registration-options"
      className="options"
      selectedValue={this.state.registrationOption}
      onChange={value => {
        this.setState({ registrationOption: value });
      }}
    >
      <label>
        <Radio value="individual" />
        Just me
      </label>
      <label>
        <Radio value="pair" />
        Me and another alum
      </label>
      <label>
        <Radio value="couple" />
        Me and a plus-one
      </label>
    </RadioGroup>
  );

  render() {
    const FormField = this.renderFormField;
    const RegistrationOptions = this.renderRegistrationOptions;

    return (
      <div className="form" id="registration-form">
        <h3>Who's registering?</h3>
        <RegistrationOptions />
        {this.state.registrationOption && (
          <>
            <h3>My Information</h3>
            <FormField labelText="First Name" />
            <FormField labelText="Last Name" />
            <FormField labelText="Email" />
            <h3>Price: $125.00</h3>
            <PaypalButton id="paypal-button" amount="125.00" />
          </>
        )}
      </div>
    );
  }
}

export default RegistrationForm;
