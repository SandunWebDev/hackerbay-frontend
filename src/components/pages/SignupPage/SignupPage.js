import React, { Component } from "react";
import { Link } from "react-router-dom";

import SignupForm from "../../forms/SignupForm/SignupForm";
import "./SignupPage.css";

export default class SignupPage extends Component {
  render() {
    return (
      <div className="SignupPage">
        <div>
          <h1 className="SignupPage__header">
            Let's Create Your Hackerbay Account
          </h1>

          <SignupForm />

          <p className="SignupPage__alreadyHaveMsg">
            Already have an account? <Link to="/login">LogIn</Link>
          </p>
        </div>
      </div>
    );
  }
}
