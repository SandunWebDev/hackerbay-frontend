import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/userActions";

import AuthHelperForm from "../AuthHelperForm/AuthHelperForm";
import { reduxForm, Field } from "redux-form";
import reduxFormLevelValidator from "../helpers/reduxFormLevelValidator";
import CustomInputWithErrorOutput from "../customInputs/CustomInputWithErrorOutput/CustomInputWithErrorOutput";
import { required, email, length } from "redux-form-validators";

export const validateOptionsForFormLevelValidation = {
  email: [
    required({ message: "Required." }),
    email({ message: "Must be a valid email." })
  ],
  password: [
    required({ message: "Required." }),
    length({ min: 5, message: "Must be at least 5 character." })
  ]
};

const formInitialValues = {
  email: "",
  password: ""
};

export class LoginForm extends Component {
  render() {
    // Submit Action
    const { loginAccount } = this.props.userActions;
    const { loggedIn, successRedirect } = this.props;

    const myProps = {
      formSubmitMsg: "Sumbitting...",
      formSubmitFailedMsg: "Login Failed.",
      buttonTitle: "LogIn",
      sucessRedirect: successRedirect,
      onSubmitAction: loginAccount,
      loggedIn: loggedIn,
      className: "LoginForm"
    };

    const reduxFormAndOtherProps = this.props;

    return (
      <AuthHelperForm {...reduxFormAndOtherProps} {...myProps}>
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
  form: "LoginForm",
  validate: reduxFormLevelValidator(validateOptionsForFormLevelValidation),
  initialValues: formInitialValues,
  touchOnChange: true // Whenever onChange() is executed mark those fields as touched. Very useful for testing.
};

const reduxFormIntialzedLoginForm = reduxForm(reduxFormConfig)(LoginForm);

export default connect(
  mapStateToProps,
  mapActionsToProps
)(reduxFormIntialzedLoginForm);

LoginForm.propTypes = {
  successRedirect: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userActions: PropTypes.shape({
    loginAccount: PropTypes.func.isRequired
  })
  // In addition reduxForm also inject numbers of props.
};

LoginForm.defaultProps = {
  successRedirect: "/"
};
