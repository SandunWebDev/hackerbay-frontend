import { actionTypes } from "../actions/userActions";

export const userReducerDefaultState = {
  loggedIn: false,
  name: "",
  email: "",
  token: ""
};

export default (state = userReducerDefaultState, action) => {
  const resData = action.payload ? action.payload.data : {};

  switch (action.type) {
    case actionTypes.USER__CREATE_ACCOUNT + "_FULFILLED": {
      return {
        ...state,
        loggedIn: resData.success,
        name: resData.name,
        email: resData.email,
        token: resData.session
      };
    }
    case actionTypes.USER__LOGIN_ACCOUNT + "_FULFILLED": {
      return {
        ...state,
        loggedIn: resData.success,
        name: resData.name,
        email: resData.email,
        token: resData.session
      };
    }
    case actionTypes.USER__LOGOUT_ACCOUNT: {
      return {
        ...state,
        ...userReducerDefaultState
      };
    }
    default:
      return state;
  }
};
