import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";

import DashboardPage, {
  DashboardPage as DashboardPageWithoutRedux
} from "./DashboardPage";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

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
    fullList: []
  },
  websiteActions: {
    addWebsite: () => {}
  },
  websiteListActions: { loadAllWebsiteLinks: () => {} },
  token: ""
};

storiesOf("Pages/DashboardPage", module)
  .addDecorator(injectReduxAndRouter())
  .addWithJSX("Intitial View", () => {
    return <DashboardPage />;
  })

  .addWithJSX("Error Occured", () => {
    const customProps = {
      websiteList: {
        ...defaultProps.websiteList,
        error: "Some Error Occured"
      }
    };

    return <DashboardPageWithoutRedux {...defaultProps} {...customProps} />;
  })
  .addWithJSX("While Fetching", () => {
    const customProps = {
      websiteList: {
        ...defaultProps.websiteList,
        isFetching: true
      }
    };

    return <DashboardPageWithoutRedux {...defaultProps} {...customProps} />;
  })
  .addWithJSX("With Top Bar", () => {
    // Top Bar "ONLY" shown when theres no error and not fetching.

    const customProps = {
      websiteList: {
        ...defaultProps.websiteList,
        isFetching: false
      }
    };

    return <DashboardPageWithoutRedux {...defaultProps} {...customProps} />;
  })
  .addWithJSX("With Top Bar & Items", () => {
    // Top Bar "ONLY" shown when theres no error and not fetching.

    const customProps = {
      websiteList: {
        ...defaultProps.websiteList,
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

    return <DashboardPageWithoutRedux {...defaultProps} {...customProps} />;
  });
