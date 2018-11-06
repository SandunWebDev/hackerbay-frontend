import React from "react";
import { shallow, mount } from "enzyme";

import DashboardPage from "./DashboardPage";
import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

describe("DashboardPage Component", () => {
  it("Should get renderd with out error.", () => {
    shallow(<DashboardPage />);
  });
});
