// Custom Input with BluePrintJSInput to work with Redux Form.

import React, { Component } from "react";
import PropTypes from "prop-types";

import { FormGroup, InputGroup } from "@blueprintjs/core";

class CustomInputWithErrorOutput extends Component {
  render() {
    const {
      // From redux-form
      input,
      meta,
      label,
      type,
      placeholder,
      className,
      intent // Deside the color of helperText
    } = this.props;

    return (
      <div>
        <FormGroup
          className={
            "CustomInputWithErrorOutput CustomInputWithErrorOutput__" +
            input.name +
            " " +
            className
          }
          helperText={meta.touched && meta.error ? meta.error : ""}
          intent={intent}
          label={label}
          labelFor={input.name}
          large={true}
        >
          <InputGroup
            {...input}
            id={input.name}
            type={type}
            placeholder={placeholder}
          />
        </FormGroup>
      </div>
    );
  }
}

export default CustomInputWithErrorOutput;

CustomInputWithErrorOutput.propTypes = {
  input: PropTypes.object.isRequired, // Lot of props for input element from redux-form.
  meta: PropTypes.shape({
    // Specifc data about this element like errors from redux-form.
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  }),
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  intent: PropTypes.string.isRequired
};

CustomInputWithErrorOutput.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: undefined
  },
  name: "myInput",
  label: "",
  type: "text",
  placeholder: "",
  className: "",
  intent: "danger"
};
