import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/userActions";

import AuthHelperForm from "../AuthHelperForm/AuthHelperForm";
import { reduxForm, Field } from "redux-form";
import reduxFormLevelValidator from "../helpers/reduxFormLevelValidator";
import CustomInputWithErrorOutput from "../customInputs/CustomInputWithErrorOutput/CustomInputWithErrorOutput";
import {
  required,
  email,
  length,
  format,
  confirmation
} from "redux-form-validators";

const validateOptionsForFormLevelValidation = {
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
  ],
  phoneNum: [
    required({ message: "Required." }),
    format({ with: /^\+[1-9]\d{1,14}$/i, message: "Not A Valid Phone Number" })
  ]
};

const formInitialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phoneNum: ""
};

export class SignupForm extends Component {
  render() {
    // Submit Action
    const { createAccount } = this.props.userActions;
    const { loggedIn, successRedirect } = this.props;

    const myProps = {
      formSubmitMsg: "Sumbitting...",
      formSubmitFailedMsg: "Signup Failed.",
      buttonTitle: "SignUp",
      successRedirect: successRedirect,
      onSubmitAction: createAccount,
      loggedIn: loggedIn,
      className: "SignupForm"
    };

    const reduxFormAndOtherProps = this.props;

    return (
      <AuthHelperForm {...myProps} {...reduxFormAndOtherProps}>
        <Field
          component={CustomInputWithErrorOutput}
          name="name"
          label="Full Name : "
          type="text"
          placeholder="Your Full Name"
          intent="danger"
        />

        <Field
          component={CustomInputWithErrorOutput}
          name="email"
          label="Email : "
          type="email"
          placeholder="Your Valid Email"
          intent="danger"
        />

        <Field
          component={CustomInputWithErrorOutput}
          name="password"
          label="Password : "
          type="password"
          placeholder="Your Password"
          intent="danger"
        />

        <Field
          component={CustomInputWithErrorOutput}
          name="passwordConfirm"
          label="Confirm Password : "
          type="password"
          placeholder="Confirm Your Password"
          intent="danger"
        />

        <Field
          component={CustomInputWithErrorOutput}
          name="phoneNum"
          label="Phone Number: "
          type="text"
          placeholder="+94761234567"
          intent="danger"
        />
      </AuthHelperForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn
  };
};

const mapActionsToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export const reduxFormConfig = {
  form: "SignupForm",
  validate: reduxFormLevelValidator(validateOptionsForFormLevelValidation),
  initialValues: formInitialValues
};

const reduxFormIntialzedSignupForm = reduxForm(reduxFormConfig)(SignupForm);

export default connect(
  mapStateToProps,
  mapActionsToProps
)(reduxFormIntialzedSignupForm);

SignupForm.propTypes = {
  successRedirect: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userActions: PropTypes.shape({
    createAccount: PropTypes.func.isRequired
  })
  // reduxForm also inject numbers of props.
};

SignupForm.defaultProps = {
  successRedirect: "/"
};
