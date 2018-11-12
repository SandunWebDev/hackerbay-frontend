import { actionTypes } from "../actions/dashboardActions";
import { actionTypes as userActionTypes } from "../actions/userActions";
import { handleAxiosErrors } from "../../configs/axiosInstancesErrorHandlers";

export const dashboardReducerDefaultState = {
  websiteList: {
    isFetching: false,
    error: "",
    fullList: [],
    sortedAndFilteredList: []
  },
  addWebsite: {
    isFetching: false,
    error: "",
    success: false,
    addedWebsite: ""
  },
  deleteWebsite: {
    isFetching: false,
    error: "",
    success: false
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
          fullList: resData.result,
          sortedAndFilteredList: resData.result
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
          error: serverError,
          fullList: [],
          sortedAndFilteredList: []
        }
      };
    }

    case actionTypes.websiteList.DASHBOARD__WEBSITELIST__SORT_AND_FILTER: {
      return {
        ...state,
        websiteList: {
          ...state.websiteList,
          sortedAndFilteredList: action.payload
        }
      };
    }

    /* ----- A Website Actions-----*/
    // DASHBOARD__WEBSITE__ADD_WEBSITE
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
          fullList: [...state.websiteList.fullList, resData.added],
          sortedAndFilteredList: [...state.websiteList.fullList, resData.added]
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

    // DASHBOARD__WEBSITE__DELETE_WEBSITE
    case actionTypes.website.DASHBOARD__WEBSITE__DELETE_WEBSITE + "_PENDING": {
      return {
        ...state,
        deleteWebsite: {
          ...state.deleteWebsite,
          isFetching: true,
          error: "",
          success: false
        }
      };
    }
    case actionTypes.website.DASHBOARD__WEBSITE__DELETE_WEBSITE +
      "_FULFILLED": {
      const deletedWebsiteItemId = resData.deletedWebsiteItemId;

      const currentFullList = state.websiteList.fullList;

      const newFullList = currentFullList.filter(item => {
        if (item.id !== deletedWebsiteItemId) {
          return item;
        }
      });

      return {
        ...state,
        deleteWebsite: {
          ...state.deleteWebsite,
          isFetching: false,
          error: "",
          success: true
        },
        websiteList: {
          ...state.websiteList,
          fullList: newFullList,
          sortedAndFilteredList: newFullList
        }
      };
    }
    case actionTypes.website.DASHBOARD__WEBSITE__DELETE_WEBSITE + "_REJECTED": {
      const serverError = handleAxiosErrors(action.payload);

      return {
        ...state,
        deleteWebsite: {
          ...state.deleteWebsite,
          isFetching: false,
          error: serverError,
          success: false
        }
      };
    }

    /* ----- External User Reducer Actions -----*/
    case userActionTypes.USER__LOGOUT_ACCOUNT: {
      return dashboardReducerDefaultState;
    }

    default:
      return state;
  }
};
