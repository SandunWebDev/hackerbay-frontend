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
    shallow(<App />);
  });

  it("Should have <Header> component.", () => {
    const wrappedApp = mount(withReduxAndRouter(<App />));

    expect(wrappedApp.find("Header").exists()).toEqual(true);
  });

  it("Should render <HomePage> component when url is '/'", () => {
    const pathSetted = (
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const wrappedApp = mount(withReduxProvider(pathSetted));

    expect(wrappedApp.find("HomePage").exists()).toEqual(true);
  });

  it("Should render <LoginPage> component when url is '/login'", () => {
    const pathSetted = (
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    const wrappedApp = mount(withReduxProvider(pathSetted));

    expect(wrappedApp.find("LoginPage").exists()).toEqual(true);
  });

  it("Should render <SignupPage> component when url is '/signup'", () => {
    const pathSetted = (
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    const wrappedApp = mount(withReduxProvider(pathSetted));

    expect(wrappedApp.find("SignupPage").exists()).toEqual(true);
  });

  it("Should render <DashboardPage> component when url is '/dashboard' and User is LOGGED IN.", () => {
    const pathSetted = (
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    const wrappedApp = mount(
      withReduxProvider(pathSetted, {
        user: {
          loggedIn: true // Mocking User loggedIn.
        }
      })
    );

    expect(wrappedApp.find("DashboardPage").exists()).toEqual(true);
  });

  it("Should redirect to HomePage(/) when user tried to access not available path like '/thisdoesnotexist'", () => {
    const pathSetted = (
      <MemoryRouter initialEntries={["/thisdoesnotexist"]}>
        <App />
      </MemoryRouter>
    );

    const wrappedApp = mount(withReduxProvider(pathSetted));

    expect(wrappedApp.find("HomePage").exists()).toEqual(true);
  });
});
