import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import injectReactRouter from "../../../stories/customDecorators/injectReactRouter";

import { Header } from "./Header";

storiesOf("Root/Header", module)
  .addDecorator(injectReactRouter())
  .add("Intitial View", () => (
    <Header user={{}} logoutAccount={action("Logout Clicked")} />
  ))
  .add("User Logged In", () => (
    <Header
      user={{ loggedIn: true, name: "John Doe" }}
      logoutAccount={action("Logout Clicked")}
    />
  ));
