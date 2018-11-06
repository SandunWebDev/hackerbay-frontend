import { actionTypes } from "../actions/dashboardActions";
import { handleAxiosErrors } from "../../configs/axiosInstancesErrorHandlers";

export const dashboardReducerDefaultState = {
  websiteList: {
    isFetching: false,
    error: "",
    fullList: []
  }
};

export default (state = dashboardReducerDefaultState, action) => {
  const resData = action.payload ? action.payload.data : {};

  switch (action.type) {
    case actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL +
      "_PENDING": {
      return {
        ...state,
        websiteList: { ...state.websiteList, isFetching: true }
      };
    }
    case actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL +
      "_FULFILLED": {
      return {
        ...state,
        websiteList: {
          ...state.websiteList,
          isFetching: false,
          error: "",
          fullList: resData.result
        }
      };
    }
    case actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL +
      "_REJECTED": {
      const serverError = handleAxiosErrors(action.payload);
      return {
        ...state,
        websiteList: {
          ...state.websiteList,
          isFetching: false,
          error: serverError
        }
      };
    }
    default:
      return state;
  }
};
