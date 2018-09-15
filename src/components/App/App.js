import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hackerbay Server Monitoring</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
        </nav>

        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
      </div>
    );
  }
}
