import React from "react";
import { storiesOf } from "@storybook/react";

import injectReduxProvider from "../../../stories/customDecorators/injectReduxProvider";
import injectReactRouter from "../../../stories/customDecorators/injectReactRouter";
import LoginForm from "./LoginForm";

import { reduxForm } from "redux-form";
import {
  LoginForm as LoginFormWithoutWrapper,
  reduxFormConfig
} from "./LoginForm";

storiesOf("Forms/LoginForm", module)
  .addDecorator(injectReduxProvider())
  .addDecorator(injectReactRouter())
  .add("Initial View", () => {
    return <LoginForm />;
  })
  .add("When Form Is Submitting", () => {
    const MockedLoginForm = reduxForm({
      ...reduxFormConfig,
      destroyOnUnmount: false,
      keepDirtyOnReinitialize: true
    })(LoginFormWithoutWrapper);

    const myProps = {
      user: {
        loggedIn: false
      },
      userActions: { loginAccount: () => {} },

      initialValues: { email: "a@a.com", password: "pppp" },
      submitting: true,
      pristine: false,
      pure: false
    };

    return <MockedLoginForm {...myProps} />;
  });
