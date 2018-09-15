import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import SignupPage from "../pages/SignupPage/SignupPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hackerbay Server Monitoring</h1>
        <Link to="/signup">Signup</Link>
        <Route exact path="/signup" component={SignupPage} />
      </div>
    );
  }
}

export default App;
