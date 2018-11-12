import React from "react";
import { mount } from "enzyme";

import WebsiteList from "./WebsiteList";
import { withReduxAndRouter } from "../../../../tests/helpers/enzymeHelpers";

const defaultProps = {
  websiteListReduxState: {
    isFetching: false,
    fullList: [],
    sortedAndFilteredList: [],
    error: ""
  },
  websiteListActions: {
    loadAllWebsiteLinks: jest.fn(),
    sortAndFilter: jest.fn
  },
  token: ""
};

describe("WebsiteList Component", () => {
  it("Should get renderd with out error.", () => {
    mount(<WebsiteList />);
  });

  it("Should provided loadAllWebsiteLinks() redux action get called 'once' with 'token' when component mounting.", () => {
    const customProps = {
      websiteListActions: {
        loadAllWebsiteLinks: jest.fn()
      },
      token: "ABCDE"
    };

    mount(<WebsiteList {...defaultProps} {...customProps} />);

    expect(
      customProps.websiteListActions.loadAllWebsiteLinks
    ).toHaveBeenCalledTimes(1);

    expect(
      customProps.websiteListActions.loadAllWebsiteLinks
    ).toHaveBeenCalledWith("ABCDE");
  });

  it("Should Only render spinner animation when fetching data.", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        isFetching: true
      }
    };

    const wrappedWebsiteList = mount(
      <WebsiteList {...defaultProps} {...customProps} />
    );

    expect(wrappedWebsiteList.find(".WebsiteList--fetching").exists()).toEqual(
      true
    );
  });

  it("Should render error with error text and a reload button when error occured while fetching.", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        error: "Some Error Occured."
      }
    };

    const wrappedWebsiteList = mount(
      <WebsiteList {...defaultProps} {...customProps} />
    );

    expect(wrappedWebsiteList.find(".WebsiteList--error").exists()).toEqual(
      true
    );

    expect(
      wrappedWebsiteList.find("[data-testid='errorMsg']").exists()
    ).toEqual(true);

    expect(
      wrappedWebsiteList.find("[data-testid='reloadButton']").exists()
    ).toEqual(true);

    expect(wrappedWebsiteList.find("[data-testid='errorMsg']").text()).toEqual(
      "Some Error Occured."
    );
  });

  it("Should fire loadAllWebsiteLinks() redux action when reload button on error state clicked.", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        error: "Some Error Occured."
      },
      websiteListActions: {
        loadAllWebsiteLinks: jest.fn()
      },
      token: "ABCDE"
    };

    const wrappedReloadButton = mount(
      <WebsiteList {...defaultProps} {...customProps} />
    ).find("button[data-testid='reloadButton']");

    wrappedReloadButton.simulate("click");

    expect(
      customProps.websiteListActions.loadAllWebsiteLinks
    ).toHaveBeenCalledTimes(2); // Two time becuase once when mounting and once when we click here.

    expect(
      customProps.websiteListActions.loadAllWebsiteLinks
    ).toHaveBeenCalledWith("ABCDE");
  });

  it("Should render message telling list is empty when websitelist don't contain any entries.", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        fullList: []
      }
    };

    const wrappedWebsiteList = mount(
      <WebsiteList {...defaultProps} {...customProps} />
    );

    expect(wrappedWebsiteList.find(".WebsiteList--noItems").exists()).toEqual(
      true
    );
  });

  it("Should render WebsiteListItems for each item in list.", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        fullList: [
          {
            websiteName: "Google",
            url: "https://google.com",
            onlineStatus: true,
            updatedAt: new Date()
          },
          {
            websiteName: "Yahoo",
            url: "https://yahoo.com",
            onlineStatus: false,
            updatedAt: new Date("2018-02-15")
          }
        ],
        sortedAndFilteredList: [
          {
            websiteName: "Google",
            url: "https://google.com",
            onlineStatus: true,
            updatedAt: new Date()
          },
          {
            websiteName: "Yahoo",
            url: "https://yahoo.com",
            onlineStatus: false,
            updatedAt: new Date("2018-02-15")
          }
        ]
      }
    };

    const wrappedWebsiteList = mount(
      <WebsiteList {...defaultProps} {...customProps} />
    );

    expect(wrappedWebsiteList.find("WebsiteListItem").length).toEqual(2);
  });
});
