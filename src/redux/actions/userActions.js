import {
  axiosBase,
  axiosBaseReduxFromErrorHandler
} from "../../configs/axiosInstances";

export const actionTypes = {
  USER__CREATE_ACCOUNT: "USER___CREATE_ACCOUNT",
  USER__LOGIN_ACCOUNT: "USER___LOGIN_ACCOUNT"
};

export function createAccount(signupformInputValues) {
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
    }).catch(axiosBaseReduxFromErrorHandler);
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
    }).catch(axiosBaseReduxFromErrorHandler);
  };
}
