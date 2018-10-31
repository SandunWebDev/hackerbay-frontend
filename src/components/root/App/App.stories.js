import React from "react";
import { storiesOf } from "@storybook/react";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

import App from "./App";

storiesOf("Root/App", module)
  .addDecorator(injectReduxAndRouter())
  .add("Intitial View", () => <App />);
