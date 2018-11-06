import { axiosBase } from "../../configs/axiosInstances";
import { axiosBaseDefaultErrorHandler } from "../../configs/axiosInstancesErrorHandlers";

export const actionTypes = {
  websiteList: {
    DASHBOARD__WEBSITELIST__LOAD_ALL: "DASHBOARD__WEBSITELIST__LOAD_ALL"
  }
};

export const actions = {
  websiteListActions: {
    loadAllWebsiteLinks: loadAllWebsiteLinks
  }
};

function loadAllWebsiteLinks(token = "") {
  return async dispatch => {
    const websiteListPromise = axiosBase.get("website/list?token=" + token);

    return dispatch({
      type: actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL,
      payload: websiteListPromise
    }).catch(axiosBaseDefaultErrorHandler);
  };
}
