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
    // const websiteListPromise = axiosBase.get("website/list?token=" + token);
    const websiteListPromise = axiosBase.get(
      "website/list?token=" +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxMGMwM2MxLWRjYTEtNDRjNC05YTIxLTVhMGRkOWEwMjZmOCIsImlhdCI6MTU0MTU1MjgyOCwiZXhwIjoxNTQxNTU2NDI4fQ.V6da-22OSfmuee9oEy_9cjXo6t7WeNANQ8UcNnA1Mws"
    );

    return dispatch({
      type: actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL,
      payload: websiteListPromise
    }).catch(axiosBaseDefaultErrorHandler);
  };
}
