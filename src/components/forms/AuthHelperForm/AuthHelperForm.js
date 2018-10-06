import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Callout, Button } from "@blueprintjs/core";

import "./AuthHelperForm.css";
import formLoaderAnimation from "../../../assets/loaders/formLoader.gif";

export default class AuthHelperForm extends Component {
  render() {
    const {
      // From redux-form
      error,
      handleSubmit,
      pristine,
      submitting,
      submitSucceeded,

      // Custom Input Fields
      children,

      // To customizing Form
      formSubmitMsg,
      formSubmitFailedMsg,
      buttonTitle,
      sucessRedirect,
      className,

      // Redux actions & states
      onSubmitAction,
      loggedIn
    } = this.props;

    if (submitSucceeded || loggedIn) {
      return <Redirect to={sucessRedirect} />;
    }

    return (
      <div className={"AuthHelperForm AuthHelperForm__" + className}>
        <form onSubmit={handleSubmit(onSubmitAction)}>
          {/* Displaying loaders & errors if applicable. */}
          {(error || submitting) && (
            <Callout
              className="AuthHelperForm__Callout"
              title={error ? formSubmitFailedMsg : formSubmitMsg}
              intent={error ? "danger" : "warning"}
              icon={
                error ? (
                  "error"
                ) : (
                  <img
                    className="bp3-icon"
                    src={formLoaderAnimation}
                    alt={formSubmitMsg}
                    width="25"
                  />
                )
              }
            >
              {error || ""}
            </Callout>
          )}

          {/* Rendering each form inputs */}
          {children}

          <Button
            className="AuthHelperForm__Button"
            fill={true}
            type="submit"
            text={buttonTitle}
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

AuthHelperForm.propTypes = {
  // From redux-form
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,

  // Custom Input Fields - Must be at least one <Field/> element.
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,

  // // To customizing Form
  formSubmitMsg: PropTypes.string.isRequired,
  formSubmitFailedMsg: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  sucessRedirect: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,

  // // Redux actions & states
  onSubmitAction: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};
