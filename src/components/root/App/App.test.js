import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import {
  withReduxAndRouter,
  withReduxProvider
} from "../../../tests/helpers/enzymeHelpers";

describe("App Component", () => {
  it("Should get renderd with out error.", () => {
    // shallow(<App />);
  });

  // it("Should have <Header> component.", () => {
  //   const wrappedLoginPage = mount(withReduxAndRouter(<App />));

  //   expect(wrappedLoginPage.find("Header").exists()).toEqual(true);
  // });

  // it("Should render <HomePage> component when url is '/'", () => {
  //   const pathSetted = (
  //     <MemoryRouter initialEntries={["/"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   const wrappedLoginPage = mount(withReduxProvider(pathSetted));

  //   expect(wrappedLoginPage.find("HomePage").exists()).toEqual(true);
  // });

  // it("Should render <LoginPage> component when url is '/login'", () => {
  //   const pathSetted = (
  //     <MemoryRouter initialEntries={["/login"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   const wrappedLoginPage = mount(withReduxProvider(pathSetted));

  //   expect(wrappedLoginPage.find("LoginPage").exists()).toEqual(true);
  // });

  // it("Should render <SignupPage> component when url is '/signup'", () => {
  //   const pathSetted = (
  //     <MemoryRouter initialEntries={["/signup"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   const wrappedLoginPage = mount(withReduxProvider(pathSetted));

  //   expect(wrappedLoginPage.find("SignupPage").exists()).toEqual(true);
  // });
});
