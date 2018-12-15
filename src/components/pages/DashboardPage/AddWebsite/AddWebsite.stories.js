import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";

import AddWebsite from "./AddWebsite";

import { injectReduxAndRouter } from "../../../../stories/customDecorators/injectContexts";

storiesOf("Pages/DashboardPage/AddWebsite", module)
  .addDecorator(injectReduxAndRouter())
  .addDecorator(injectReduxAndRouter())
  .addWithJSX("Intitial View", () => {
    return <AddWebsite />;
  })
  .addWithJSX("Opened View", () => {
    return <AddWebsite isOpen={true} />;
  });
