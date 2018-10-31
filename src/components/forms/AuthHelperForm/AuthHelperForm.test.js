import React from "react";
import { mount, shallow } from "enzyme";

import CustomInputWithErrorOutput from "../customInputs/CustomInputWithErrorOutput/CustomInputWithErrorOutput";
import { Field, reduxForm } from "redux-form";
import { withReduxProvider } from "../../../tests/helpers/enzymeHelpers";

import AuthHelperForm from "./AuthHelperForm";

const defaultProps = {
  // From redux-form
  error: "",
  handleSubmit: jest.fn().mockReturnValue(() => {}),
  pristine: true,
  submitting: false,
  submitSucceeded: false,

  // Custom Input Fields - Must be at least one <Field/> element.
  children: [
    <Field
      component={CustomInputWithErrorOutput}
      name="email"
      label="Email : "
      type="email"
      placeholder="Your Valid Email"
      intent="danger"
      key={"email"}
    />,

    <Field
      component={CustomInputWithErrorOutput}
      name="password"
      label="Password : "
      type="password"
      placeholder="Your Password"
      intent="danger"
      key={"password"}
    />
  ],

  // To customizing Form
  formSubmitMsg: "Submitting",
  formSubmitFailedMsg: "Network Error",
  buttonTitle: "Submit",
  sucessRedirect: "/",
  className: "AuthForm",

  // // Redux actions & states
  onSubmitAction: jest.fn(),
  loggedIn: false
};

describe("AuthHelperForm Component", () => {
  it("Should get renderd without error with default props.", () => {
    shallow(<AuthHelperForm {...defaultProps} />);
  });

  it("Should get Redirected when loggedIn OR submitSucceeded is true.", () => {
    let wrappedAuthHelperForm = shallow(
      <AuthHelperForm {...defaultProps} loggedIn={true} />
    );
    expect(wrappedAuthHelperForm.find("Redirect[to='/']").exists()).toEqual(
      true
    );

    wrappedAuthHelperForm = shallow(
      <AuthHelperForm {...defaultProps} submitSucceeded={true} />
    );
    expect(wrappedAuthHelperForm.find("Redirect[to='/']").exists()).toEqual(
      true
    );
  });

  it("Should render <Callout> with error message when error is available.", () => {
    const wrappedAuthHelperForm = shallow(
      <AuthHelperForm {...defaultProps} error="My Error" />
    );

    expect(
      wrappedAuthHelperForm.find(".AuthHelperForm__Callout").exists()
    ).toEqual(true);

    expect(
      wrappedAuthHelperForm.find(".AuthHelperForm__Callout").props()
    ).toEqual(
      expect.objectContaining({
        title: defaultProps.formSubmitFailedMsg,
        intent: "danger",
        icon: "error"
      })
    );

    expect(
      wrappedAuthHelperForm
        .find(".AuthHelperForm__Callout")
        .dive()
        .contains("My Error")
    ).toEqual(true);
  });

  it("Should render <Callout> with submit message while submitting is true.", () => {
    const wrappedAuthHelperForm = shallow(
      <AuthHelperForm {...defaultProps} submitting={true} />
    );

    expect(
      wrappedAuthHelperForm.find(".AuthHelperForm__Callout").exists()
    ).toEqual(true);

    expect(
      wrappedAuthHelperForm.find(".AuthHelperForm__Callout").props()
    ).toEqual(
      expect.objectContaining({
        title: defaultProps.formSubmitMsg,
        intent: "warning"
      })
    );
  });
});
