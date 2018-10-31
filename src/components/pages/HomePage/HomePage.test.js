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
  });

  it("Should have major h2 headline which display initial instructions.", () => {
    const wrappedHomePage = shallow(<HomePage />);

    expect(wrappedHomePage.find("h2").exists()).toEqual(true);
  });
});
