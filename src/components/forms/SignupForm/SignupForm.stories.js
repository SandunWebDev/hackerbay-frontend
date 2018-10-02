import React from "react";
import { storiesOf } from "@storybook/react";

import injectReduxProvider from "../../../stories/customDecorators/injectReduxProvider";
import injectReactRouter from "../../../stories/customDecorators/injectReactRouter";
import SignupForm from "./SignupForm";

storiesOf("Forms/SignupForm", module)
  .addDecorator(injectReduxProvider())
  .addDecorator(injectReactRouter())
  .add("Initial View", () => {
    return <SignupForm />;
  });
