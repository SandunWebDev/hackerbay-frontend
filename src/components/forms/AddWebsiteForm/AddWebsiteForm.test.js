import React from "react";
import { mount } from "enzyme";

import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

import AddWebsiteForm from "./AddWebsiteForm";

describe("AddWebsiteForm Component", () => {
  it("Should get rendered without error.", () => {
    mount(withReduxAndRouter(<AddWebsiteForm />));
  });
});
