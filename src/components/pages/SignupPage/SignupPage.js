import React, { Component } from "react";
import { Link } from "react-router-dom";

import SignupForm from "./SignupForm";
import "./SignupPage.css";

export default class SignupPage extends Component {
  onSubmit(values) {
    // Get SignForms value when its submitted.
    console.log("Signup Form Values", values);
  }

  render() {
    return (
      <div className="SignupPage">
        <div>
          <h1 className="SignupPage__header">
            Let's Create Your Hackerbay Account
          </h1>
          <SignupForm onSubmit={this.onSubmit} />
          <p className="SignupPage__loginmsg">
            Already have an account? <Link to="/login">LogIn</Link>
          </p>
        </div>
      </div>
    );
  }
}
