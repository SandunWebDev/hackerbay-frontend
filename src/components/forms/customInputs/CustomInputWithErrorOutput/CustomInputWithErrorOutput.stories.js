import React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";

import CustomInputWithErrorOutput from "./CustomInputWithErrorOutput";

storiesOf("Custom Inputs/CustomInputWithErrorOutput", module)
  .addDecorator(
    host({
      align: "center",
      height: 200,
      width: 400
    })
  )
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
