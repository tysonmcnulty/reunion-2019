import React, { Component } from "react";
import Registration from "./Registration";
import "./App.css";

class App extends Component {
  state = {
    registering: false,
    registered: false
  };

  handleRegisterNow = () => {
    this.setState(prevState => ({
      registering: !prevState.registering,
      registered: false
    }));
  };

  handleSuccess = response => {
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
          <Registration onSuccess={this.handleSuccess} />
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
