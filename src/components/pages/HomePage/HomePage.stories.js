import React from "react";
import { storiesOf } from "@storybook/react";

import { injectReduxAndRouter } from "../../../stories/customDecorators/injectContexts";

import HomePage from "./HomePage";

// Just making background to blue since font color is white.
const styles = {
  background: "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)"
};

storiesOf("Pages/HomePage", module)
  .addDecorator(injectReduxAndRouter())
  .addWithJSX("Intitial View", () => {
    return (
      <div style={styles}>
        <HomePage />
      </div>
    );
  })
  .addWithJSX("When Logged In", () => {
    return (
      <div style={styles}>
        <HomePage isLoggedIn={true} />
      </div>
    );
  })
  .addWithJSX("When Logged Out", () => {
    return (
      <div style={styles}>
        <HomePage isLoggedIn={false} />
      </div>
    );
  });
