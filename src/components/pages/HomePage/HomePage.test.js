import React from "react";
import { shallow } from "enzyme";

import HomePage from "./HomePage";

describe("HomePage Component", () => {
  it("Should get rendered without error", () => {
    shallow(<HomePage />);
  });

  it("Should have major h1 headline which display sites name.", () => {
    const wrappedHomePage = shallow(<HomePage />);

    expect(wrappedHomePage.find("h1").exists()).toEqual(true);
    expect(
      wrappedHomePage
        .find("h1")
        .text()
        .includes("Hackerbay")
    ).toEqual(true);
  });

  it("Should only render buttons which links to login Page and signUp page when user is not logged in.", () => {
    const wrappedHomePage = shallow(<HomePage isLoggedIn={false} />);

    expect(wrappedHomePage.find(".HomePage__dashboardButton").exists()).toEqual(
      false
    );
    expect(wrappedHomePage.find(".HomePage__loginButton").exists()).toEqual(
      true
    );
    expect(wrappedHomePage.find(".HomePage__signupButton").exists()).toEqual(
      true
    );
  });

  it("Should only render dashboard page buttons which links to dashboard Page when user is logged in.", () => {
    const wrappedHomePage = shallow(<HomePage isLoggedIn={true} />);

    expect(wrappedHomePage.find(".HomePage__dashboardButton").exists()).toEqual(
      true
    );
    expect(wrappedHomePage.find(".HomePage__loginButton").exists()).toEqual(
      false
    );
    expect(wrappedHomePage.find(".HomePage__signupButton").exists()).toEqual(
      false
    );
  });
});
