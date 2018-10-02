import React, { Component } from "react";
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
      <div className={"AuthHelperForm " + className}>
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
