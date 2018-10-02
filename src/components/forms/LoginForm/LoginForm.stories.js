import React from "react";
import { storiesOf } from "@storybook/react";

import injectReduxProvider from "../../../stories/customDecorators/injectReduxProvider";
import injectReactRouter from "../../../stories/customDecorators/injectReactRouter";
import LoginForm from "./LoginForm";
import { LoginForm as ABC } from "./LoginForm";

storiesOf("Forms/LoginForm", module)
  .addDecorator(injectReduxProvider())
  .addDecorator(injectReactRouter())
  .add("Initial View", () => {
    return <LoginForm />;
  });
