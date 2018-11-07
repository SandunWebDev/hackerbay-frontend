import React, { Component } from "react";
import PropTypes from "prop-types";

import { reduxForm, Field } from "redux-form";
import reduxFormLevelValidator from "../helpers/reduxFormLevelValidator";
import CustomInputWithErrorOutput from "../customInputs/CustomInputWithErrorOutput/CustomInputWithErrorOutput";
import { required, length, url } from "redux-form-validators";

import { Button, Callout, Icon } from "@blueprintjs/core";

import formLoaderAnimation from "../../../assets/loaders/formLoader.gif";
import "./AddWebsiteForm.css";

export const validateOptionsForFormLevelValidation = {
  websiteName: [
    required({ message: "Required." }),
    length({
      max: 20,
      message: "Website name is too long. Please use simple, descriptive name."
    })
  ],
  url: [
    required({ message: "Required." }),
    url({ protocols: ["http", "https"], message: "Must be a valid URL." })
  ]
};

const formInitialValues = {
  websiteName: "",
  url: ""
};

export class AddWebsiteForm extends Component {
  render() {
    let {
      // From redux-form
      error,
      handleSubmit,
      pristine,
      submitting,
      submitSucceeded,

      // Custom Props Passed From DashboardPage
      onSubmitAction,
      token
    } = this.props;

    if (submitSucceeded) {
      return (
        <div className="AddWebsiteForm">
          <div className="AddWebsiteForm__successMessage">
            <Icon icon="endorsed" />
            <div>Sucessfully Added.</div>
          </div>
        </div>
      );
    }

    return (
      <div className="AddWebsiteForm">
        <form
          onSubmit={handleSubmit(formValues =>
            onSubmitAction(token, formValues)
          )}
        >
          {/* Displaying loaders & errors if applicable. */}
          {(error || submitting) && (
            <Callout
              className="AddWebsiteForm__Callout"
              title={error ? "Website Adding Failed." : "Adding Website..."}
              intent={error ? "danger" : "warning"}
              icon={
                error ? (
                  "error"
                ) : (
                  <img
                    className="bp3-icon"
                    src={formLoaderAnimation}
                    alt="Website Sucessfully Added"
                    width="25"
                  />
                )
              }
              data-testid="authFormCallout"
            >
              {error || ""}
            </Callout>
          )}

          <Field
            component={CustomInputWithErrorOutput}
            name="websiteName"
            label="Website Name : "
            type="text"
            placeholder="Enter A Descriptive Name"
            intent="danger"
          />

          <Field
            component={CustomInputWithErrorOutput}
            name="url"
            label="URL : "
            type="text"
            placeholder="Enter Valid URL"
            intent="danger"
          />

          <Button
            className="AuthHelperForm__Button"
            fill={true}
            type="submit"
            text="Add"
            disabled={pristine || submitting}
            intent="success"
            icon="add"
            large={true}
            loading={submitting}
            data-testid="submitButton"
          />
        </form>
      </div>
    );
  }
}

export const reduxFormConfig = {
  form: "AddWebsiteForm",
  validate: reduxFormLevelValidator(validateOptionsForFormLevelValidation),
  initialValues: formInitialValues,
  touchOnChange: true // Whenever onChange() is executed mark those fields as touched. Very useful for testing.
};

const reduxFormIntialzedAddWebsiteForm = reduxForm(reduxFormConfig)(
  AddWebsiteForm
);

export default reduxFormIntialzedAddWebsiteForm;

AddWebsiteForm.propTypes = {
  onSubmitAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired

  // In addition to these reduxForm also inject numbers of props.
};

AddWebsiteForm.defaultProps = {
  onSubmitAction: () => {},
  token: ""
};
