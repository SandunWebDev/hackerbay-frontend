import React from "react";
import { storiesOf } from "@storybook/react";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";
import SignupForm from "./SignupForm";

storiesOf("Forms/SignupForm", module)
  .addDecorator(injectReduxAndRouter())
  .add("Initial View", () => {
    return <SignupForm />;
  });
