import { axiosBase } from "../../configs/axiosInstances";
import {
  axiosBaseDefaultErrorHandler,
  axiosBaseReduxFormErrorHandler
} from "../../configs/axiosInstancesErrorHandlers";

export const actionTypes = {
  websiteList: {
    DASHBOARD__WEBSITELIST__LOAD_ALL: "DASHBOARD__WEBSITELIST__LOAD_ALL"
  },
  website: {
    DASHBOARD__WEBSITE__ADD_WEBSITE: "DASHBOARD__WEBSITE__ADD_WEBSITE"
  }
};

export const actions = {
  websiteListActions: {
    loadAllWebsiteLinks: loadAllWebsiteLinks
  },
  websiteActions: {
    addWebsite: addWebsite
  }
};

/* ----- WebsiteList Actions-----*/
function loadAllWebsiteLinks(token = "") {
  return async dispatch => {
    const websiteListPromise = axiosBase.get("website/list?token=" + token);
    // const websiteListPromise = axiosBase.get(
    //   "website/list?token=" +
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxMGMwM2MxLWRjYTEtNDRjNC05YTIxLTVhMGRkOWEwMjZmOCIsImlhdCI6MTU0MTU3NTM0OCwiZXhwIjoxNTQxNTc4OTQ4fQ.80KJfO0X6IU5gmD-qTEdCy5N_p1gFAIickdlmaf9FYs"
    // );

    return dispatch({
      type: actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL,
      payload: websiteListPromise
    }).catch(axiosBaseDefaultErrorHandler);
  };
}

/* ----- A Website Actions-----*/
function addWebsite(token = "", addWebsiteFormInputValues = {}) {
  const { websiteName, url } = addWebsiteFormInputValues;

  return async dispatch => {
    const websiteAddingPromise = axiosBase.post("website/add", {
      websiteName,
      url,
      token
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxMGMwM2MxLWRjYTEtNDRjNC05YTIxLTVhMGRkOWEwMjZmOCIsImlhdCI6MTU0MTU3NTM0OCwiZXhwIjoxNTQxNTc4OTQ4fQ.80KJfO0X6IU5gmD-qTEdCy5N_p1gFAIickdlmaf9FYs"
    });

    return dispatch({
      type: actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE,
      payload: websiteAddingPromise
    }).catch(axiosBaseReduxFormErrorHandler);
  };
}
