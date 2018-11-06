import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";

import WebsiteList from "./WebsiteList";

import { injectReduxAndRouter } from "../../../../stories/customDecorators/injectContexts";

storiesOf("Pages/WebsiteList", module)
  .addDecorator(injectReduxAndRouter())
  .addWithJSX("Intitial View", () => {
    return <WebsiteList />;
  });
