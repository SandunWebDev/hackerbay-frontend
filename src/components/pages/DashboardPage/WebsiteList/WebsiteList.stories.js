import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import WebsiteList from "./WebsiteList";

const defaultProps = {
  websiteListReduxState: {
    isFetching: false,
    fullList: [],
    sortedAndFilteredList: [],
    error: ""
  },
  websiteListActions: {
    loadAllWebsiteLinks: action("Fetched Action Fired"),
    sortAndFilter: action("SortAndFilter Action Fired")
  },
  token: ""
};

storiesOf("Pages/DashboardPage/WebsiteList", module)
  // .addDecorator(injectReduxAndRouter())
  .addWithJSX("Intitial View", () => {
    return <WebsiteList {...defaultProps} />;
  })
  .addWithJSX("While Fetching", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        isFetching: true
      }
    };

    return <WebsiteList {...defaultProps} {...customProps} />;
  })
  .addWithJSX("Error Occured", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        error: "Some Error Occured"
      }
    };

    return <WebsiteList {...defaultProps} {...customProps} />;
  })
  .addWithJSX("When List Is Empty", () => {
    const customProps = {
      websiteListReduxState: {
        ...defaultProps.websiteListReduxState,
        fullList: []
      }
    };

    return <WebsiteList {...defaultProps} {...customProps} />;
  })
  .addWithJSX("When List Has Entries.", () => {
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

    return <WebsiteList {...defaultProps} {...customProps} />;
  });
