import React from "react";
import { mount } from "enzyme";

import WebsiteListToolbar from "./WebsiteListToolbar";

const defaultProps = {
  sortAndFilter: () => {},
  fullList: [],
  currentSortedAndFilteredList: []
};
describe("WebsiteListToolbar Component", () => {
  it("Should get renderd with out error.", () => {
    mount(<WebsiteListToolbar />);
  });

  it("sortAndFilter() should get fired once when component mounted.", () => {
    const customeProps = {
      sortAndFilter: jest.fn()
    };

    mount(<WebsiteListToolbar {...defaultProps} {...customeProps} />);

    expect(customeProps.sortAndFilter).toHaveBeenCalledTimes(1);
  });

  it("sortAndFilter() should get fired when sort ascending and descending button clicked.", () => {
    const customeProps = {
      sortAndFilter: jest.fn()
    };

    const wrappedWebsiteListToolbar = mount(
      <WebsiteListToolbar {...defaultProps} {...customeProps} />
    );

    const sortDescendingButton = wrappedWebsiteListToolbar
      .find("[data-testid='sortDescendingButton']")
      .at(0);
    sortDescendingButton.simulate("click");

    const sortAscendingButton = wrappedWebsiteListToolbar
      .find("[data-testid='sortDescendingButton']")
      .at(0);
    sortAscendingButton.simulate("click");

    // Called three time beacuse one when component mount then two button clicks.
    expect(customeProps.sortAndFilter).toHaveBeenCalledTimes(3);
  });

  it("sortAndFilter() should get fired when sortTag selector and filterTag selector have changed.", () => {
    const customeProps = {
      sortAndFilter: jest.fn()
    };

    const wrappedWebsiteListToolbar = mount(
      <WebsiteListToolbar {...defaultProps} {...customeProps} />
    );

    const sortTagSelector = wrappedWebsiteListToolbar
      .find("[data-testid='sortTagSelector']")
      .at(1);
    sortTagSelector.simulate("change", { target: { value: "websiteName" } });

    const filterTagSelector = wrappedWebsiteListToolbar
      .find("[data-testid='filterTagSelector']")
      .at(1);
    filterTagSelector.simulate("change", { target: { value: "websiteName" } });

    // Called three time beacuse one when component mount then two select changes.
    expect(customeProps.sortAndFilter).toHaveBeenCalledTimes(3);
  });

  it("sortAndFilter() should get fired when sortTag selector and filterTag selector have changed.", () => {
    const customeProps = {
      sortAndFilter: jest.fn()
    };

    const wrappedWebsiteListToolbar = mount(
      <WebsiteListToolbar {...defaultProps} {...customeProps} />
    );

    const filterTagTextBox = wrappedWebsiteListToolbar
      .find("[data-testid='filterTagTextBox']")
      .at(1);
    filterTagTextBox.simulate("change", { target: { value: "something" } });

    // Called three time beacuse one when component mount then on text box changes.
    expect(customeProps.sortAndFilter).toHaveBeenCalledTimes(2);
  });
});
