import React, { Component } from "react";

import SignupForm from "./SignupForm";

export default class SignupPage extends Component {
  onSubmit(values) {
    // Get SignForms value when its submitted.
    console.log("Signup Form Values", values);
  }

  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <SignupForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}
