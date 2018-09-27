import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import * as userActions from "../../../redux/actions/userActions";

import { required, email, length } from "redux-form-validators";

import { FormGroup, InputGroup, Button, Callout } from "@blueprintjs/core";

import "./LoginForm.css";
import formLoaderAnimation from "../../../assets/loaders/formLoader.gif";

const fieldValidateOptions = {
  email: [
    required({ message: "Required." }),
    email({ message: "Must be a valid email." })
  ],
  password: [
    required({ message: "Required." }),
    length({ min: 5, message: "Must be at least 5 character." })
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
      <FormGroup
        className="LoginForm__Input"
        helperText={meta.touched && meta.error ? meta.error : ""}
        intent="danger"
        label={label}
        labelFor={name}
        large={true}
      >
        <InputGroup
          {...input}
          id={name}
          type={type}
          placeholder={placeholder}
        />
      </FormGroup>
    </div>
  );
};

const formInitialValues = {
  email: "",
  password: ""
};

class LoginForm extends Component {
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
      <div className="LoginForm">
        <form onSubmit={handleSubmit(userActions.loginAccount)}>
          {/* Displaying loaders & errors if applicable. */}
          {(error || submitting) && (
            <Callout
              className="LoginForm__Callout"
              title={error ? "Signup Failed" : "Submitting...."}
              intent={error ? "danger" : "warning"}
              icon={
                error ? (
                  "error"
                ) : (
                  <img
                    className="bp3-icon"
                    src={formLoaderAnimation}
                    alt="Submitting"
                    width="25"
                  />
                )
              }
            >
              {error || ""}
            </Callout>
          )}

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

          <Button
            className="LoginForm__Button"
            fill={true}
            type="submit"
            text="LogIn"
            disabled={pristine || submitting}
            intent="success"
            icon="upload"
            large={true}
            loading={submitting}
          />
        </form>
      </div>
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

const reduxIntializedLoginForm = reduxForm({
  form: "LoginForm",
  validate: fieldValidatorFunction,
  initialValues: formInitialValues
})(LoginForm);

export default connect(
  mapStateToProps,
  mapActionsToProps
)(reduxIntializedLoginForm);
