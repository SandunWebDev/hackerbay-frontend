import React from "react";
import { storiesOf } from "@storybook/react";

import CustomInputWithErrorOutput from "./CustomInputWithErrorOutput";

storiesOf("Custom Inputs/CustomInputWithErrorOutput", module)
  .add("Initial View", () => {
    const myProps = {
      placeholder: "This is my input"
    };

    return <CustomInputWithErrorOutput {...myProps} />;
  })
  .add("With Label", () => {
    const myProps = {
      input: { value: "John", onChange: () => {} },
      label: "My Name : "
    };

    return <CustomInputWithErrorOutput {...myProps} />;
  })
  .add("With Error Text", () => {
    const myProps = {
      input: { value: "123456", onChange: () => {} },
      meta: {
        touched: true,
        error: "Must be a string."
      },
      intent: "danger" // Specify color
    };

    return <CustomInputWithErrorOutput {...myProps} />;
  });
