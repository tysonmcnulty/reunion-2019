import { RadioGroup, Radio } from "react-radio-group";
import { pricingDetails, pricingExplanation } from "./pricing";
import React from "react";
import PaypalSmartButton from "./PaypalSmartButton";
import "./Registration.css";

const kebabify = text => {
  return text
    .toLowerCase()
    .split(" ")
    .join("-");
};

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      ticketOption: "",
      attendeeOption: ""
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
        {this.state.attendeeOption === "pair" && (
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

    switch (this.state.attendeeOption) {
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

  renderTicketOptions = () => (
    <RadioGroup
      id="ticket-options"
      selectedValue={this.state.ticketOption}
      onChange={value => {
        this.setState({ ticketOption: value });
      }}
    >
      <div className="option-group">
        <label className="option">
          <Radio value="full" />
          <span>Yes, sign me up for everything!</span>
        </label>
        <label className="option">
          <Radio value="dinner" />
          <span>No, just dinner on Saturday night.</span>
        </label>
      </div>
    </RadioGroup>
  );

  renderAttendeeOptions = () => (
    <RadioGroup
      id="attendee-options"
      selectedValue={this.state.attendeeOption}
      onChange={value => {
        this.setState({ attendeeOption: value });
      }}
    >
      <div className="option-group">
        <label className="option">
          <Radio value="individual" />
          <span>Just me</span>
          <span className="left-space">
            ($
            {
              pricingDetails({
                ...this.state,
                attendeeOption: "individual"
              })["base"]
            }
            *)
          </span>
        </label>
        <label className="option">
          <Radio value="pair" />
          <span>Me and another alum</span>
          <span className="left-space">
            ($
            {
              pricingDetails({
                ...this.state,
                attendeeOption: "pair"
              })["base"]
            }
            *)
          </span>
        </label>
        <label className="option">
          <Radio value="couple" />
          <span>Me and a non-alum</span>
          <span className="left-space">
            ($
            {
              pricingDetails({
                ...this.state,
                attendeeOption: "couple"
              })["base"]
            }
            *)
          </span>
        </label>
      </div>
      <p>*Price before payment processing</p>
    </RadioGroup>
  );

  render() {
    const AttendeeOptions = this.renderAttendeeOptions;
    const TicketOptions = this.renderTicketOptions;
    const Form = this.renderForm;
    const details = pricingDetails(this.state);

    return (
      <div className="form" id="registration-form">
        <h3>Are you coming for the full weekend?</h3>
        <TicketOptions />
        {this.state.ticketOption && (
          <>
            <h3>Who's registering?</h3>
            <AttendeeOptions />
          </>
        )}
        {details.total && (
          <>
            <Form />
            <h2>Price: ${details.total}</h2>
            <p>({pricingExplanation(details)})</p>
            <PaypalSmartButton
              id="paypal-button"
              amount={process.env.REACT_APP_PRICE_OVERRIDE || details.total}
              onSuccess={this.props.onSuccess}
            />
          </>
        )}
      </div>
    );
  }
}

export default Registration;
