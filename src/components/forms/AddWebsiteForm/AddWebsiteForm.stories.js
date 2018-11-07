import React from "react";
import { storiesOf } from "@storybook/react";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

import AddWebsiteForm from "./AddWebsiteForm";

storiesOf("Forms/AddWebsiteForm", module)
  .addDecorator(injectReduxAndRouter())
  .add("Initial View", () => {
    return <AddWebsiteForm />;
  });
