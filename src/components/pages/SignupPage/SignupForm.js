import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import * as userActions from "../../../redux/actions/userActions";

import { required, email, length, confirmation } from "redux-form-validators";

import formLoaderAnimation from "../../../assets/loaders/formLoader.gif";

const fieldValidateOptions = {
  name: [required({ message: "Required." })],
  email: [
    required({ message: "Required." }),
    email({ message: "Must be a valid email." })
  ],
  password: [
    required({ message: "Required." }),
    length({ min: 5, message: "Must be at least 5 character." })
  ],
  passwordConfirm: [
    required({ message: "Required." }),
    confirmation({ field: "password", message: "Passwords doesn't match." })
  ]
};

// Generating field errors accroding to "fieldValidateOptions".
const fieldValidatorFunction = values => {
  const errors = {};
  for (let field in fieldValidateOptions) {
    let value = values[field];
    errors[field] = fieldValidateOptions[field]
      .map(validateField => {
        return validateField(value, values);
      })
      .find(x => x);
  }
  return errors;
};

const renderInput = ({ input, name, label, type, placeholder, meta }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...input} type={type} placeholder={placeholder} />
      {meta.touched &&
        meta.error && <div className="input_error"> {meta.error}</div>}
    </div>
  );
};

const formInitialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

class SignupForm extends Component {
  render() {
    const {
      error,
      handleSubmit,
      pristine,
      submitting,
      submitSucceeded
    } = this.props;
    const { userActions } = this.props;

    if (submitSucceeded) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={handleSubmit(userActions.createAccount)}>
        {submitting ? (
          <img alt="Form Submitting" src={formLoaderAnimation} />
        ) : (
          ""
        )}

        <Field
          component={renderInput}
          name="name"
          label="Full Name : "
          type="text"
          placeholder="Your Full Name"
        />

        <Field
          component={renderInput}
          name="email"
          label="Email : "
          type="email"
          placeholder="Your Valid Email"
        />

        <Field
          component={renderInput}
          name="password"
          label="Password : "
          type="password"
          placeholder="Your Password"
        />

        <Field
          component={renderInput}
          name="passwordConfirm"
          label="Confirm Password : "
          type="password"
          placeholder="Confirm Your Password"
        />

        <button type="submit" disabled={pristine || submitting}>
          Sign Up
        </button>

        {error && <div>Error : {error}</div>}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapActionsToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

const reduxIntializedSignupForm = reduxForm({
  form: "signupForm",
  validate: fieldValidatorFunction,
  initialValues: formInitialValues
})(SignupForm);

export default connect(
  mapStateToProps,
  mapActionsToProps
)(reduxIntializedSignupForm);
