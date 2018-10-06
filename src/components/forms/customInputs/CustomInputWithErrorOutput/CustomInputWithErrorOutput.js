// Custom Input with BluePrintJSInput to work with Redux Form.

import React, { Component } from "react";
import PropTypes from "prop-types";

import { FormGroup, InputGroup } from "@blueprintjs/core";

export class CustomInputWithErrorOutput extends Component {
  render() {
    const {
      // From redux-form
      input,
      meta,
      name,
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
            name +
            " " +
            className
          }
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

CustomInputWithErrorOutput.propTypes = {
  input: PropTypes.object.isRequired, // Lot of props for input element from redux-form.
  meta: PropTypes.shape({
    // Specifc data about this element like errors from redux-form.
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  intent: PropTypes.string.isRequired
};

CustomInputWithErrorOutput.defaultProps = {
  name: "",
  placeholder: "",
  className: ""
};
