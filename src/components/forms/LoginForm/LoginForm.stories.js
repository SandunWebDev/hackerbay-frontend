import React from "react";
import { storiesOf } from "@storybook/react";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

import LoginForm from "./LoginForm";

storiesOf("Forms/LoginForm", module)
  .addDecorator(injectReduxAndRouter())
  .add("Initial View", () => {
    return <LoginForm />;
  });
