import { actionTypes } from "../actions/userActions";

const defaultState = {
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
        token: resData.session
      };
    }
    default:
      return state;
  }
};
