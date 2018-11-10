import React from "react";
import { mount, shallow } from "enzyme";

import { withReduxProvider } from "../../../../tests/helpers/enzymeHelpers";

import AddWebsite from "./AddWebsite";

describe("DashboardPage -> AddWebsite Component", () => {
  it("Should get rendered with out error.", () => {
    mount(<AddWebsite />);
  });

  it("Should rendered ONLY AddWebsite--closed section initially.", () => {
    const wrappedAddWebsite = mount(<AddWebsite />);

    expect(wrappedAddWebsite.state().isOpen).toEqual(false);
    expect(wrappedAddWebsite.find(".AddWebsite--closed").exists()).toEqual(
      true
    );
    expect(wrappedAddWebsite.find(".AddWebsite--open").exists()).toEqual(false);
  });

  it("Should rendered ONLY AddWebsite--open section when user click on AddWebsite Button.", () => {
    const wrappedAddWebsite = shallow(<AddWebsite />);

    wrappedAddWebsite.find(".AddWebsite--closed").simulate("click");

    expect(wrappedAddWebsite.state().isOpen).toEqual(true);
    expect(wrappedAddWebsite.find(".AddWebsite--closed").exists()).toEqual(
      false
    );
    expect(wrappedAddWebsite.find(".AddWebsite--open").exists()).toEqual(true);
  });

  it("Should rendered ONLY AddWebsite--closed section when user click on AddWebsite CLOSE Button.", () => {
    const wrappedAddWebsite = shallow(<AddWebsite />);

    wrappedAddWebsite.find(".AddWebsite--closed").simulate("click"); // Open the form
    wrappedAddWebsite.find(".AddWebsite__closeButton").simulate("click"); // Cloase the form

    expect(wrappedAddWebsite.state().isOpen).toEqual(false);
    expect(wrappedAddWebsite.find(".AddWebsite--closed").exists()).toEqual(
      true
    );
    expect(wrappedAddWebsite.find(".AddWebsite--open").exists()).toEqual(false);
  });
});
