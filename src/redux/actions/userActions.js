import { axiosBase } from "../../configs/axiosInstances";
import { axiosBaseReduxFormErrorHandler } from "../../configs/axiosInstancesErrorHandlers";

export const actionTypes = {
  USER__CREATE_ACCOUNT: "USER___CREATE_ACCOUNT",
  USER__LOGIN_ACCOUNT: "USER___LOGIN_ACCOUNT",
  USER__LOGOUT_ACCOUNT: "USER___LOGOUT_ACCOUNT"
};

export function createAccount(signupformInputValues = {}) {
  const { name, email, password } = signupformInputValues;

  return async dispatch => {
    const newUser = axiosBase.post("user/signup", {
      name,
      email,
      password
    });

    return dispatch({
      type: actionTypes.USER__CREATE_ACCOUNT,
      payload: newUser
    }).catch(axiosBaseReduxFormErrorHandler);
  };
}

export function loginAccount(loginFormInputValues) {
  const { email, password } = loginFormInputValues;

  return async dispatch => {
    const user = axiosBase.post("user/login", {
      email,
      password
    });

    return dispatch({
      type: actionTypes.USER__LOGIN_ACCOUNT,
      payload: user
    }).catch(axiosBaseReduxFormErrorHandler);
  };
}

export function logoutAccount() {
  return {
    type: actionTypes.USER__LOGOUT_ACCOUNT
  };
}
