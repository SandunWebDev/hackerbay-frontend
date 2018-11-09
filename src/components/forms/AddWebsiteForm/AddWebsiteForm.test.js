import React from "react";
import { mount, shallow } from "enzyme";

import { withReduxAndRouter } from "../../../tests/helpers/enzymeHelpers";

import AddWebsiteForm, {
  AddWebsiteForm as AddWebsiteFormWithoutWrapper
} from "./AddWebsiteForm";

const defaultProps = {
  // From redux-form
  error: "",
  handleSubmit: jest.fn(),
  pristine: true,
  submitting: false,
  submitSucceeded: false,

  // Custom Props Passed From DashboardPage
  onSubmitAction: jest.fn(),
  token: ""
};

describe("AddWebsiteForm Component", () => {
  it("Should get rendered without error.", () => {
    mount(withReduxAndRouter(<AddWebsiteForm />));
  });

  it("Should show only successMessage when successfully submitted.", () => {
    const wrappedAddWebsiteForm = mount(
      <AddWebsiteFormWithoutWrapper {...defaultProps} submitSucceeded={true} />
    );

    expect(
      wrappedAddWebsiteForm.find("[data-testid='successMessage']").exists()
    ).toEqual(true);

    expect(
      wrappedAddWebsiteForm.find("[data-testid='addWebSiteForm']").exists()
    ).toEqual(false);
  });

  it("Should display Callout with error when submit error occured.", () => {
    const wrappedAddWebsiteForm = shallow(
      <AddWebsiteFormWithoutWrapper
        {...defaultProps}
        error={"Some Error Occured"}
      />
    );

    const callOutElemenet = wrappedAddWebsiteForm.find(
      ".AddWebsiteForm__Callout"
    );

    expect(callOutElemenet.exists()).toEqual(true);
    expect(callOutElemenet.childAt(0).text()).toEqual("Some Error Occured");
  });

  it("Should display Callout with indicating 'Submitting...' when submitting happens.", () => {
    const wrappedAddWebsiteForm = shallow(
      <AddWebsiteFormWithoutWrapper {...defaultProps} submitting={true} />
    );

    const callOutElemenet = wrappedAddWebsiteForm.find(
      ".AddWebsiteForm__Callout"
    );

    expect(callOutElemenet.exists()).toEqual(true);

    expect(callOutElemenet.props()).toEqual(
      expect.objectContaining({
        title: "Adding Website..."
      })
    );
  });

  it("Should not display Callout when theres no error or submitting happen.", () => {
    const wrappedAddWebsiteForm = shallow(
      <AddWebsiteFormWithoutWrapper
        {...defaultProps}
        submitting={false}
        error=""
      />
    );

    const callOutElemenet = wrappedAddWebsiteForm.find(
      ".AddWebsiteForm__Callout"
    );

    expect(callOutElemenet.exists()).toEqual(false);
  });

  it("Should be disabled (Submit Button) when no data is inputted by user or while submitting.", () => {
    let wrappedAuthHelperForm = shallow(
      <AddWebsiteFormWithoutWrapper {...defaultProps} submitting={true} />
    );

    expect(
      wrappedAuthHelperForm.find(".AuthHelperForm__Button").props()
    ).toEqual(
      expect.objectContaining({
        disabled: true
      })
    );

    wrappedAuthHelperForm = shallow(
      <AddWebsiteFormWithoutWrapper {...defaultProps} pristine={true} />
    );

    expect(
      wrappedAuthHelperForm.find(".AuthHelperForm__Button").props()
    ).toEqual(
      expect.objectContaining({
        disabled: true
      })
    );
  });
});
