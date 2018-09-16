import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class SignupForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Your Full Name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Your Valid Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Your Password"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field
            name="passwordConfirm"
            component="input"
            type="password"
            placeholder="Confirm Your Password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "SignupForm"
})(SignupForm);
