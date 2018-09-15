import { actionTypes } from "../actions/userActions";

export default (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.USER__UPDATE_EMAIL:
      return { ...state, email: action.email };
    default:
      return state;
  }
};
