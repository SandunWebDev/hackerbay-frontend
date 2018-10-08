import React from "react";
import { shallow, mount } from "enzyme";

import SignupPage from "./SignupPage";
import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

describe("SignupPage", () => {
  it("Should get renderd with out error.", () => {
    shallow(<SignupPage />);
  });

  it("Should have <SignupForm/> component.", () => {
    const wrappedSignupPage = mount(withReduxAndRouter(<SignupPage />));

    expect(wrappedSignupPage.find("SignupForm").exists()).toEqual(true);
  });

  it("Should have <Link> component which links to '/login'", () => {
    const wrappedSignupPage = mount(withReduxAndRouter(<SignupPage />));

    expect(wrappedSignupPage.find("Link").exists()).toEqual(true);
    expect(wrappedSignupPage.find("Link").props().to).toEqual("/login");
  });
});
