import React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { action } from "@storybook/addon-actions";
import withReduxForm from "redux-form-storybook";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

import AddWebsiteForm, {
  AddWebsiteForm as AddWebsiteFormWithOutWrapper
} from "./AddWebsiteForm";

const defaultProps = {
  // From redux-form
  error: "",
  handleSubmit: action("handleSubmit Fired."),
  pristine: true,
  submitting: false,
  submitSucceeded: false,

  // Custom Props Passed From DashboardPage
  onSubmitAction: action("onSubmitAction Fired."),
  token: ""
};

storiesOf("Forms/AddWebsiteForm", module)
  .addDecorator(injectReduxAndRouter())
  .addDecorator(
    host({
      align: "center bottom",
      height: "80%",
      width: "80%"
    })
  )
  .add("Initial View (Interactive)", () => {
    return <AddWebsiteForm />;
  });

// Directly working on compnent without redux-form wrapper.
storiesOf("Forms/AddWebsiteForm", module)
  .addDecorator(withReduxForm) // Give ability to render "<Field/>" without redux-form.
  .addDecorator(
    host({
      align: "center bottom",
      height: "80%",
      width: "80%"
    })
  )
  .add("While Submitting.", () => {
    return <AddWebsiteFormWithOutWrapper {...defaultProps} submitting={true} />;
  })
  .add("Submit Suceeded.", () => {
    return (
      <AddWebsiteFormWithOutWrapper {...defaultProps} submitSucceeded={true} />
    );
  })
  .add("Submit Error Occured.", () => {
    return (
      <AddWebsiteFormWithOutWrapper
        {...defaultProps}
        error={"Website Already Exist."}
      />
    );
  })
  .add("Submit Button Enabled.", () => {
    return (
      <AddWebsiteFormWithOutWrapper
        {...defaultProps}
        pristine={false}
        submitting={false}
      />
    );
  });
