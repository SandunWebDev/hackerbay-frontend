import React, { Component } from "react";

export default class SignupPage extends Component {
  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <form name="signup_form">
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Valid Email" />
          <input type="password" name="password" placeholder="Your Password" />
          <input
            type="password"
            name="password_confirm"
            placeholder="Retype Your Password"
          />
          <button>Create My Account</button>
        </form>
      </div>
    );
  }
}
