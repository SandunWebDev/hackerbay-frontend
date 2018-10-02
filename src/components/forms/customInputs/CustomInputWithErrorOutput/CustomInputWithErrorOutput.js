// Custom Input with BluePrintJSInput to work with Redux Form.

import React, { Component } from "react";

import { FormGroup, InputGroup } from "@blueprintjs/core";

export class CustomInputWithErrorOutput extends Component {
  render() {
    console.log(this.props.input);

    const {
      input = {},
      name = "",
      label = "",
      type = "text",
      placeholder = "",
      meta = {},
      className = "",
      intent = ""
    } = this.props;

    return (
      <div>
        <FormGroup
          className={className}
          helperText={meta.touched && meta.error ? meta.error : ""}
          intent={intent}
          label={label}
          labelFor={name}
          large={true}
        >
          <InputGroup
            {...input}
            id={name}
            type={type}
            placeholder={placeholder}
          />
        </FormGroup>
      </div>
    );
  }
}

export default CustomInputWithErrorOutput;
