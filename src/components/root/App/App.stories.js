import React from "react";
import { storiesOf } from "@storybook/react";

import injectReduxProvider from "../../../stories/customDecorators/injectReduxProvider";
import injectReactRouter from "../../../stories/customDecorators/injectReactRouter";

import App from "./App";

storiesOf("Root/App", module)
  .addDecorator(injectReduxProvider())
  .addDecorator(injectReactRouter())
  .add("Intitial View", () => <App />);
