import { actionTypes } from "../actions/userActions";

const defaultState = {
  loggedIn: false,
  name: "",
  email: "",
  token: ""
};

export default (state = defaultState, action) => {
  const resData = action.payload ? action.payload.data : "";

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
    default:
      return state;
  }
};
