import React, { Component } from "react";
import Registration from "./Registration";
import "./App.css";

class App extends Component {
  state = {
    registering: false,
    registered: false,
    registration: {
      attendee: {},
      guest: {}
    }
  };

  changeHandlerFor = person => detail => event => {
    const { value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      registration: {
        ...prevState.registration,
        [person]: {
          ...prevState.registration[person],
          [detail]: value
        }
      }
    }));
  };

  handleRegisterNow = () => {
    this.setState(prevState => ({
      registering: !prevState.registering,
      registered: false
    }));
  };

  handleSuccess = response => {
    fetch("/api/registration", {
      method: "POST",
      body: this.state
    });

    this.setState({
      registering: false,
      registered: true,
      response
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Class of 2004 15th Reunion</h1>
          <h2>October 4-6, 2019</h2>
        </header>
        <div>
          <button className="button" onClick={this.handleRegisterNow}>
            REGISTER NOW
          </button>
        </div>
        {this.state.registering && (
          <Registration
            registration={this.state.registration}
            changeHandlerFor={this.changeHandlerFor}
            onSuccess={this.handleSuccess}
          />
        )}
        {!this.state.registered && <div className="spacer" />}
        {this.state.registered && (
          <>
            <h3>Thank you!</h3>
            <div>
              Your payment has been successfully processed. You're all set!
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
