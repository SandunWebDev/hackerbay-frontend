import React, { Component } from "react";

import SignupPage from "../pages/SignupPage/SignupPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hackerbay Server Monitoring</h1>
        <SignupPage />
      </div>
    );
  }
}

export default App;
