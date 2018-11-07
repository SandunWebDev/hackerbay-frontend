import { actionTypes } from "../actions/dashboardActions";
import { handleAxiosErrors } from "../../configs/axiosInstancesErrorHandlers";

export const dashboardReducerDefaultState = {
  websiteList: {
    isFetching: false,
    error: "",
    fullList: []
  },
  addWebsite: {
    isFetching: false,
    error: "",
    success: false,
    addedWebsite: ""
  }
};

export default (state = dashboardReducerDefaultState, action) => {
  const resData = action.payload ? action.payload.data : {};

  switch (action.type) {
    /* ----- WebsiteList Actions-----*/
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

    /* ----- A Website Actions-----*/
    case actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE + "_PENDING": {
      return {
        ...state,
        addWebsite: {
          ...state.addWebsite,
          isFetching: true,
          success: false,
          error: ""
        }
      };
    }
    case actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE + "_FULFILLED": {
      return {
        ...state,
        websiteList: {
          ...state.websiteList,
          fullList: [...state.websiteList.fullList, resData.added]
        },
        addWebsite: {
          ...state.addWebsite,
          isFetching: false,
          error: "",
          success: true,
          addedWebsite: resData.added
        }
      };
    }
    case actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE + "_REJECTED": {
      const serverError = handleAxiosErrors(action.payload);

      return {
        ...state,
        addWebsite: {
          ...state.addWebsite,
          isFetching: false,
          error: serverError,
          success: false,
          addedWebsite: ""
        }
      };
    }

    default:
      return state;
  }
};
