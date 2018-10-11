import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AuthHelperForm from "./AuthHelperForm";

import withReduxForm from "redux-form-storybook";
import { Field } from "redux-form";
import CustomInputWithErrorOutput from "../customInputs/CustomInputWithErrorOutput/CustomInputWithErrorOutput";

const defaultProps = {
  // From redux-form
  error: undefined,
  handleSubmit: action("Handle Submit"),
  pristine: true,
  submitting: false,
  submitSucceeded: false,

  // Custom Input Fields
  children: (
    <Field
      component={CustomInputWithErrorOutput}
      name="name"
      label="Name : "
      type="text"
      placeholder="Your Name"
      intent="danger"
    />
  ),

  // To customizing Form
  formSubmitMsg: "Submitting",
  formSubmitFailedMsg: "Submit Failed",
  buttonTitle: "Submbit",
  sucessRedirect: "/",
  className: "mySumbit",

  // Redux actions & states
  onSubmitAction: action("Submit Clicked"),
  loggedIn: false
};

storiesOf("Forms/AuthHelperForm", module)
  .addDecorator(withReduxForm) // Give ability to render "<Field/>" without redux-form.
  .add("Initial View", () => {
    return <AuthHelperForm {...defaultProps} />;
  })
  .add("When Sumbitting [SKIP-IMAGESHOTS]", () => {
    const myProps = { ...defaultProps, submitting: true };

    return <AuthHelperForm {...myProps} />;
  })
  .add("Submit Failed OR Error", () => {
    const myProps = {
      ...defaultProps,
      submitting: false,
      error: "Some error occured."
    };

    return <AuthHelperForm {...myProps} />;
  });
