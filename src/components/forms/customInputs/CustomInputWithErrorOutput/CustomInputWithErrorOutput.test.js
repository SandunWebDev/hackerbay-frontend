import React from "react";
import { mount } from "enzyme";

import CustomInputWithErrorOutput from "./CustomInputWithErrorOutput";

describe("CustomInputWithErrorOutput Component", () => {
  it("Should get renderd without error with default props.", () => {
    mount(<CustomInputWithErrorOutput />);
  });

  it("Should render label when label prop is passed.", () => {
    const wrappedCustomInput = mount(
      <CustomInputWithErrorOutput label="Age" />
    );

    expect(wrappedCustomInput.find("label").text()).toEqual("Age ");
  });

  it("Should render error helper text when touched and error is available.", () => {
    const wrappedCustomInput = mount(
      <CustomInputWithErrorOutput
        meta={{ touched: true, error: "Not a valid email." }}
      />
    );

    expect(wrappedCustomInput.find(".bp3-form-helper-text").text()).toEqual(
      "Not a valid email."
    );
  });
});
