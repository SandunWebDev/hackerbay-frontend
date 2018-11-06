import React from "react";
import { mount } from "enzyme";

import DashboardPage from "./DashboardPage";
import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

describe("DashboardPage Component", () => {
  it("Should get renderd with out error.", () => {
    mount(withReduxAndRouter(<DashboardPage />));
  });
});
