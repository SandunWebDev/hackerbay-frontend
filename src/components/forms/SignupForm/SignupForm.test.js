import React from "react";
import { mount } from "enzyme";

import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

import SignupForm from "./SignupForm";

describe("SignupForm Component", () => {
  it("Should get rendered without error and get necessary props from redux.", () => {
    const wrappedSignupForm = mount(withReduxAndRouter(<SignupForm />));

    expect(wrappedSignupForm.find("SignupForm").props()).toHaveProperty(
      "loggedIn"
    );
    expect(
      wrappedSignupForm.find("SignupForm").props().userActions
    ).toHaveProperty("createAccount");
  });

  it("Should render <AuthHelper> with necessary props.", () => {
    const wrappedSignupForm = mount(withReduxAndRouter(<SignupForm />));

    expect(wrappedSignupForm.find("AuthHelperForm").exists()).toEqual(true);

    const propsOfAuthHelper = Object.keys(
      wrappedSignupForm.find("AuthHelperForm").props()
    );

    expect(propsOfAuthHelper).toEqual(
      expect.arrayContaining([
        "formSubmitMsg",
        "formSubmitFailedMsg",
        "buttonTitle",
        "successRedirect",
        "onSubmitAction",
        "className",
        "loggedIn",
        "userActions"
      ])
    );
  });

  it("Should render <AuthHelper> with four input fields.", () => {
    const wrappedSignupForm = mount(withReduxAndRouter(<SignupForm />));

    expect(wrappedSignupForm.find("Field").length).toEqual(4);

    expect(wrappedSignupForm.find("Field[name='name']").exists()).toEqual(true);
    expect(wrappedSignupForm.find("Field[name='email']").exists()).toEqual(
      true
    );
    expect(wrappedSignupForm.find("Field[name='password']").exists()).toEqual(
      true
    );
    expect(
      wrappedSignupForm.find("Field[name='passwordConfirm']").exists()
    ).toEqual(true);
  });
});
