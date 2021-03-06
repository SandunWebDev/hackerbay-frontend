import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";

import LoginPage from "./LoginPage";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

storiesOf("Pages/LoginPage", module)
  .addDecorator(injectReduxAndRouter())
  .addWithJSX("Intitial View", () => {
    // Just making background to blue since font color is white.
    const styles = {
      background: "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)"
    };

    return (
      <div style={styles}>
        <LoginPage />
      </div>
    );
  });
