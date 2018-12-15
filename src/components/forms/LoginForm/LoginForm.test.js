import React from "react";
import { mount } from "enzyme";

import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

import LoginForm from "./LoginForm";

describe("LoginForm Component", () => {
  it("Should get rendered without error and get necessary props from redux.", () => {
    const wrappedLoginForm = mount(withReduxAndRouter(<LoginForm />));

    expect(wrappedLoginForm.find("LoginForm").props()).toHaveProperty(
      "loggedIn"
    );
    expect(
      wrappedLoginForm.find("LoginForm").props().userActions
    ).toHaveProperty("loginAccount");
  });

  it("Should render <AuthHelper> with necessary props.", () => {
    const wrappedLoginForm = mount(withReduxAndRouter(<LoginForm />));

    expect(wrappedLoginForm.find("AuthHelperForm").exists()).toEqual(true);

    const propsOfAuthHelper = Object.keys(
      wrappedLoginForm.find("AuthHelperForm").props()
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

  it("Should render <AuthHelper> with two input fields.", () => {
    const wrappedLoginForm = mount(withReduxAndRouter(<LoginForm />));

    expect(wrappedLoginForm.find("Field").length).toEqual(2);

    expect(wrappedLoginForm.find("Field[name='email']").exists()).toEqual(true);
    expect(wrappedLoginForm.find("Field[name='password']").exists()).toEqual(
      true
    );
  });

  it("Should show errors when input values are not valid.", () => {
    const wrappedLoginForm = mount(
      withReduxAndRouter(<LoginForm />, {}, false, true)
    );

    let emailInput = wrappedLoginForm.find("Field[name='email']");
    let passwordInput = wrappedLoginForm.find("Field[name='password']");

    // Invoking onChange of email & password field so validation & other redux form stuff happen. Note that this doesn't change underling value of field. But its same.
    emailInput
      .find("input")
      .props()
      .onChange("BAD_EMAIL");

    passwordInput
      .find("input")
      .props()
      .onChange("LESS");

    // Updating fields so changes recived.
    wrappedLoginForm.update();
    emailInput = wrappedLoginForm.find("Field[name='email']");
    passwordInput = wrappedLoginForm.find("Field[name='password']");

    expect(emailInput.find(".bp3-form-helper-text").exists()).toEqual(true);
    expect(passwordInput.find(".bp3-form-helper-text").exists()).toEqual(true);
  });
});
