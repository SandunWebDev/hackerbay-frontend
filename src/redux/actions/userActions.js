import {
  axiosBase,
  axiosBaseReduxFromErrorHandler
} from "../../configs/axiosInstances";

export const actionTypes = {
  USER__CREATE_ACCOUNT: "USER___CREATE_ACCOUNT"
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
