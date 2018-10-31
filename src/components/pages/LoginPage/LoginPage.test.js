import React from "react";
import { shallow, mount } from "enzyme";

import LoginPage from "./LoginPage";
import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

describe("LoginPage Component", () => {
  it("Should get renderd with out error.", () => {
    shallow(<LoginPage />);
  });

  it("Should have <LoginForm/> component.", () => {
    const wrappedLoginPage = mount(withReduxAndRouter(<LoginPage />));

    expect(wrappedLoginPage.find("LoginForm").exists()).toEqual(true);
  });

  it("Should have <Link> component which links to '/signup'", () => {
    const wrappedLoginPage = mount(withReduxAndRouter(<LoginPage />));

    expect(wrappedLoginPage.find("Link").exists()).toEqual(true);
    expect(wrappedLoginPage.find("Link").props().to).toEqual("/signup");
  });
});
