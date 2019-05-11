import React, { Component } from "react";
import Registration from "./Registration";
import "./App.css";

function postObj(url, obj) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" }
  });
}

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

  handleSuccess = transactionResult => {
    postObj("/api/registration", {
      ...this.state.registration,
      transactionResult
    });

    this.setState({
      registering: false,
      registered: true
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
        {!this.state.registered && (
          <p className="spacer" id="questions">
            Questions about schedule, activities, pricing, or who's going? Join
            the conversation in the{" "}
            <a
              href="https://www.facebook.com/groups/509758222373004/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Class of 2004 Facebook group
            </a>
            .
          </p>
        )}
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
