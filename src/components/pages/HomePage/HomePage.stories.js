import React from "react";
import { storiesOf } from "@storybook/react";

import HomePage from "./HomePage";

storiesOf("Pages/HomePage", module)
  // Just making background blue since text color is white.
  .addDecorator(story => (
    <div style={{ background: "lightblue" }}>{story()}</div>
  ))
  .addWithJSX("Intitial View", () => <HomePage />);
