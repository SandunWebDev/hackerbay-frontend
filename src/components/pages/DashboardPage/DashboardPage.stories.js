import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";

import DashboardPage from "./DashboardPage";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

storiesOf("Pages/DashboardPage", module)
  .addDecorator(injectReduxAndRouter())
  .addWithJSX("Intitial View", () => {
    return <DashboardPage />;
  });
