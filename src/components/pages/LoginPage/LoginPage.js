import React, { Component } from "react";
import { Link } from "react-router-dom";

import LoginForm from "../../forms/LoginForm/LoginForm";
import "./LoginPage.css";

export default class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage animation--pageTransition">
        <div>
          <h1 className="LoginPage__header">
            Let's Login To Your Hackerbay Account
          </h1>

          <LoginForm successRedirect="/dashboard" />

          <p className="LoginPage__alreadyHaveMsg">
            Don't have an account? <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    );
  }
}
