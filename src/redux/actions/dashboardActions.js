import { axiosBase } from "../../configs/axiosInstances";
import {
  axiosBaseDefaultErrorHandler,
  axiosBaseReduxFormErrorHandler
} from "../../configs/axiosInstancesErrorHandlers";

export const actionTypes = {
  websiteList: {
    DASHBOARD__WEBSITELIST__LOAD_ALL: "DASHBOARD__WEBSITELIST__LOAD_ALL",
    DASHBOARD__WEBSITELIST__SORT_AND_FILTER:
      "DASHBOARD__WEBSITELIST__SORT_AND_FILTER"
  },
  website: {
    DASHBOARD__WEBSITE__ADD_WEBSITE: "DASHBOARD__WEBSITE__ADD_WEBSITE"
  }
};

export const actions = {
  websiteListActions: {
    loadAllWebsiteLinks: loadAllWebsiteLinks,
    sortAndFilter: sortAndFilter
  },
  websiteActions: {
    addWebsite: addWebsite
  }
};

/* ----- WebsiteList Actions-----*/
function loadAllWebsiteLinks(token = "") {
  return async dispatch => {
    const websiteListPromise = axiosBase.get("website/list?token=" + token);

    return dispatch({
      type: actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL,
      payload: websiteListPromise
    }).catch(axiosBaseDefaultErrorHandler);
  };
}

function sortAndFilter(
  fullList,
  currentSortedAndFilteredList,
  selectedFilterTag,
  selectedFilterText,
  selectedSortTag,
  selectedSortOrderType
) {
  function filter(list, selectedFilterTag, selectedFilterText) {
    if (!selectedFilterText) {
      return list;
    }

    return list.filter((item, id) => {
      return item[selectedFilterTag]
        .toString()
        .toLowerCase()
        .includes(selectedFilterText);
    });
  }

  // Inside function to sort according to ascending or decending.
  function sort(list, orderType, selectTag) {
    if (orderType === "descending") {
      return list.sort((a, b) => {
        const sideA = a[selectTag].toString().toLowerCase();
        const sideB = b[selectTag].toString().toLowerCase();

        if (sideA > sideB) {
          return 1;
        } else if (sideA < sideB) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (orderType === "ascending") {
      return list.sort((a, b) => {
        const sideA = a[selectTag].toString().toLowerCase();
        const sideB = b[selectTag].toString().toLowerCase();

        if (sideA > sideB) {
          return -1;
        } else if (sideA < sideB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  let nextSortedAndFilterdList = [];

  nextSortedAndFilterdList = filter(
    fullList,
    selectedFilterTag,
    selectedFilterText
  );

  nextSortedAndFilterdList = sort(
    nextSortedAndFilterdList,
    selectedSortOrderType,
    selectedSortTag
  );

  return {
    type: actionTypes.websiteList.DASHBOARD__WEBSITELIST__SORT_AND_FILTER,
    payload: nextSortedAndFilterdList
  };
}

/* ----- A Website Actions-----*/
function addWebsite(token = "", addWebsiteFormInputValues = {}) {
  const { websiteName = "", url = "" } = addWebsiteFormInputValues;

  return async dispatch => {
    const websiteAddingPromise = axiosBase.post("website/add", {
      websiteName,
      url,
      token
    });

    return dispatch({
      type: actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE,
      payload: websiteAddingPromise
    }).catch(axiosBaseReduxFormErrorHandler);
  };
}
