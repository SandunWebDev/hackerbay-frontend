import React from "react";
import { mount } from "enzyme";

import WebsiteList from "./WebsiteList";
import { withReduxAndRouter } from "../../../../tests/helpers/enzymeHelpers";

describe("WebsiteList Component", () => {
  it("Should get renderd with out error.", () => {
    mount(withReduxAndRouter(<WebsiteList />));
  });
});
