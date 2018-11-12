import React from "react";
import { mount } from "enzyme";

import DashboardPage, {
  DashboardPage as DashboardPageWithoutRedux
} from "./DashboardPage";
import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

const defaultProps = {
  addWebsite: {
    isFetching: false,
    error: "",
    success: false,
    addedWebsite: ""
  },
  websiteList: {
    isFetching: false,
    error: "",
    fullList: [],
    sortedAndFilteredList: []
  },
  websiteActions: {
    addWebsite: () => {}
  },
  websiteListActions: {
    loadAllWebsiteLinks: () => {},
    sortAndFilter: () => {}
  },
  token: ""
};

describe("DashboardPage Component", () => {
  it("Should get renderd with out error.", () => {
    mount(withReduxAndRouter(<DashboardPage />));
  });

  it("Should not render Top Bar when theres error or while fetching.", () => {
    // While Fetching
    let customProps = {
      websiteList: {
        ...defaultProps.websiteList,
        isFetching: true
      }
    };

    let wrappedDashboardPageWithoutRedux = mount(
      <DashboardPageWithoutRedux {...defaultProps} {...customProps} />
    );

    expect(
      wrappedDashboardPageWithoutRedux
        .find(".DashboardPage__mainSections__topBar--hide")
        .exists()
    ).toEqual(true);

    // While Error Occured
    customProps = {
      websiteList: {
        ...defaultProps.websiteList,
        error: "Some Error Occured."
      }
    };

    wrappedDashboardPageWithoutRedux = mount(
      <DashboardPageWithoutRedux {...defaultProps} {...customProps} />
    );

    expect(
      wrappedDashboardPageWithoutRedux
        .find(".DashboardPage__mainSections__topBar--hide")
        .exists()
    ).toEqual(true);
  });

  it("Should render Top Bar when theres no error or not fetching.", () => {
    const customProps = {
      websiteList: {
        ...defaultProps.websiteList,
        error: "",
        isFetching: false
      }
    };

    const wrappedDashboardPageWithoutRedux = mount(
      <DashboardPageWithoutRedux {...defaultProps} {...customProps} />
    );

    expect(
      wrappedDashboardPageWithoutRedux
        .find(".DashboardPage__mainSections__topBar--hide")
        .exists()
    ).toEqual(false);
  });

  it("Should display no of appopriate all sites, online sites, offline sites in TopBar.", () => {
    const customProps = {
      websiteList: {
        ...defaultProps.websiteList,
        error: "",
        isFetching: false,
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
        ]
      }
    };

    const wrappedDashboardPageWithoutRedux = mount(
      <DashboardPageWithoutRedux {...defaultProps} {...customProps} />
    );

    const topBar = wrappedDashboardPageWithoutRedux.find(
      ".DashboardPage__mainSections__topBar"
    );

    // Total Sites
    expect(topBar.find(".DashboardSmallInfo--sites").text()).toEqual(
      expect.stringMatching("2")
    );

    // Online Sites
    expect(topBar.find(".DashboardSmallInfo--online").text()).toEqual(
      expect.stringMatching("1")
    );

    // Offline Sites
    expect(topBar.find(".DashboardSmallInfo--offline").text()).toEqual(
      expect.stringMatching("1")
    );
  });
});
