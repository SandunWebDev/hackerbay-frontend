import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import WebsiteListItem from "./WebsiteListItem";

const defaultProps = {
  id: "1",
  websiteName: "Google",
  url: "http://google.com",
  onlineStatus: true,
  updatedAt: new Date()
};

storiesOf("Pages/DashboardPage/WebsiteListItem", module)
  .addWithJSX("Intitial View", () => {
    return <WebsiteListItem {...defaultProps} />;
  })
  .addWithJSX("Name & URL", () => {
    return (
      <WebsiteListItem
        {...defaultProps}
        websiteName="Yahoo"
        url={"http://yahoo.com"}
      />
    );
  })
  .addWithJSX("Website is Online", () => {
    return <WebsiteListItem {...defaultProps} onlineStatus={true} />;
  })
  .addWithJSX("Website is Offline", () => {
    return <WebsiteListItem {...defaultProps} onlineStatus={false} />;
  })
  .addWithJSX("Updated Ago @", () => {
    return (
      <WebsiteListItem {...defaultProps} updatedAt={new Date("2018-11-02")} />
    );
  });
