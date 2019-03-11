import React, { Component } from "react";
import RegistrationForm from "./RegistrationForm";
import "./App.css";
import "./RegistrationForm.css";

class App extends Component {
  state = {
    registering: false
  };

  handleRegisterNow = () => {
    this.setState(prevState => ({ registering: !prevState.registering }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Class of 2004 15th Reunion</h1>
          <h2>October 4-6, 2019</h2>
          <button className="button" onClick={this.handleRegisterNow}>
            REGISTER NOW
          </button>
        </header>
        {this.state.registering && <RegistrationForm />}
      </div>
    );
  }
}

export default App;
