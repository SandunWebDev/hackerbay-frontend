import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import WebsiteListToolbar from "./WebsiteListToolbar";

const defaultProps = {
  sortAndFilter: action("sortAndFilter() Fired."),
  fullList: [],
  currentSortedAndFilteredList: []
};

storiesOf("Pages/DashboardPage/WebsiteListToolbar", module).addWithJSX(
  "Intitial View",
  () => {
    return <WebsiteListToolbar {...defaultProps} />;
  }
);
