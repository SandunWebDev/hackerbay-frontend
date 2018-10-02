import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";

import LoginPage from "./LoginPage";

import injectReduxProvider from "../../../stories/customDecorators/injectReduxProvider";
import injectReactRouter from "../../../stories/customDecorators/injectReactRouter";

storiesOf("Pages/LoginPage", module)
  .addDecorator(injectReduxProvider())
  .addDecorator(injectReactRouter())
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
