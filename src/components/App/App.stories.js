import React from "react";
import { storiesOf } from "@storybook/react";

import reduxProviderAndRouter from "../../stories/customDecorators/reduxProviderAndRouter";

import App from "./App";

storiesOf("App", module)
  .addDecorator(reduxProviderAndRouter)
  .add("Intitial View", () => <App />);
