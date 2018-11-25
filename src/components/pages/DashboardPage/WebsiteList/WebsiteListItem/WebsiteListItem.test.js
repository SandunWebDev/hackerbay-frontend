import React from "react";
import { mount } from "enzyme";

import moment from "moment";

import WebsiteListItem from "./WebsiteListItem";

const defaultProps = {
  id: "1",
  websiteName: "Google",
  url: "http://google.com",
  onlineStatus: true,
  updatedAt: new Date("2018-01-10")
};

describe("WebsiteListItem Component", () => {
  it("Should get renderd with out error.", () => {
    mount(<WebsiteListItem />);
  });

  it("Should display website name, url, online status, updated ago informations.", () => {
    const wrappedWebsiteListItem = mount(<WebsiteListItem {...defaultProps} />);

    expect(wrappedWebsiteListItem.text()).toEqual(
      expect.stringMatching("Google")
    );

    expect(wrappedWebsiteListItem.text()).toEqual(
      expect.stringMatching("http://google.com")
    );

    expect(wrappedWebsiteListItem.text()).toEqual(
      expect.stringMatching("Last Checked @")
    );

    expect(
      wrappedWebsiteListItem.find("[data-testid='onlineStatus']").exists()
    ).toEqual(true);
  });

  it("Should display url's first character as logo.", () => {
    const wrappedWebsiteListItem = mount(<WebsiteListItem {...defaultProps} />);

    expect(
      wrappedWebsiteListItem.find(".WebsiteListItem__logo--text").text()
    ).toEqual("g");
  });

  it("Should display online status icon according to onlineStatus.", () => {
    // Online Status - True
    let wrappedWebsiteListItem = mount(
      <WebsiteListItem {...defaultProps} onlineStatus={true} />
    );

    let onlineStatusIcon = wrappedWebsiteListItem
      .find("[data-testid='onlineStatus']")
      .at(0);

    expect(onlineStatusIcon.props().icon).toEqual("tick");

    // Online Status - False

    wrappedWebsiteListItem = mount(
      <WebsiteListItem {...defaultProps} onlineStatus={false} />
    );

    onlineStatusIcon = wrappedWebsiteListItem
      .find("[data-testid='onlineStatus']")
      .at(0);

    expect(onlineStatusIcon.props().icon).toEqual("warning-sign");
  });

  it("Should fire onDeleteAction when delete button is clicked.", () => {
    const onDeleteAction = jest.fn();

    const wrappedWebsiteListItem = mount(
      <WebsiteListItem {...defaultProps} onDeleteAction={onDeleteAction} />
    );

    const deleteButton = wrappedWebsiteListItem.find(
      "[data-testid='deleteButton']"
    );

    deleteButton.simulate("click");

    expect(onDeleteAction).toHaveBeenCalledTimes(1);
  });
});
