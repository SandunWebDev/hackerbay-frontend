import {
  actionTypes as dashboardActionTypes,
  actions as dashboardActions
} from "./dashboardActions";

import createMockStore from "../../tests/helpers/createMockStore";
import axiosMockAdapter from "axios-mock-adapter";
import { axiosBase } from "../../configs/axiosInstances";

const axiosBaseMock = new axiosMockAdapter(axiosBase);

const websiteActions = dashboardActions.websiteActions;
const websiteListActions = dashboardActions.websiteListActions;

const websiteActionTypes = dashboardActionTypes.website;
const websiteListActionTypes = dashboardActionTypes.websiteList;

describe("Redux Actions - dashboardActions", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore({});
  });

  afterEach(() => {
    axiosBaseMock.reset();
  });

  describe("Website Actions", () => {
    describe("When addWebsite() is called.", () => {
      it("Should dispatch DASHBOARD__WEBSITE__ADD_WEBSITE_PENDING action when network request initialized.", () => {
        axiosBaseMock.onPost("website/add").reply(200);

        mockStore.dispatch(
          websiteActions.addWebsite("myToken", {
            websiteName: "Goolge",
            url: "google.com"
          })
        );

        expect(mockStore.getActions()).toEqual([
          {
            type:
              websiteActionTypes.DASHBOARD__WEBSITE__ADD_WEBSITE + "_PENDING"
          }
        ]);
      });

      it("Should dispatch DASHBOARD__WEBSITE__ADD_WEBSITE_FULFILLED action when network request successfull.", () => {
        const serverResponse = { someServerResponse: "Hello" };

        // Mock any GET request to "website/add"
        axiosBaseMock.onPost("website/add").reply(200, serverResponse);

        return (
          mockStore
            .dispatch(
              websiteActions.addWebsite("myToken", {
                websiteName: "Goolge",
                url: "google.com"
              })
            )
            // Action Finished
            .then(() => {
              // Using [1]st Index of mockStore.getActions() because [0]th index is aget filled by "USER___CREATE_ACCOUNT_PENDING" action.
              expect(mockStore.getActions()[1]).toEqual(
                expect.objectContaining({
                  type:
                    websiteActionTypes.DASHBOARD__WEBSITE__ADD_WEBSITE +
                    "_FULFILLED"
                  // Payload Also Goes here (ex: payload: { serverResponse })
                })
              );

              // Make sure action filled with server response data.
              expect(mockStore.getActions()[1].payload.data).toEqual(
                serverResponse
              );
            })
        );
      });

      it("Should dispatch DASHBOARD__WEBSITE__ADD_WEBSITE_REJECTED action & reduxFrom submission error when network request failed.", () => {
        axiosBaseMock.onPost("website/add").networkError();

        return (
          mockStore
            .dispatch(
              websiteActions.addWebsite("myToken", {
                websiteName: "Goolge",
                url: "google.com"
              })
            )
            // Action Finished
            .catch(err => {
              expect(mockStore.getActions()[1]).toEqual(
                expect.objectContaining({
                  type:
                    websiteActionTypes.DASHBOARD__WEBSITE__ADD_WEBSITE +
                    "_REJECTED",
                  error: true
                })
              );

              // Make sure reduxForm specific submission error is thrown.
              expect(err.name).toEqual("SubmissionError");
            })
        );
      });
    });

    describe("When deleteWebsite() is called.", () => {
      it("Should dispatch DASHBOARD__WEBSITE__DELETE_WEBSITE_PENDING action when network request initialized.", () => {
        axiosBaseMock.onDelete("website/delete").reply(200);

        mockStore.dispatch(
          websiteActions.deleteWebsite("myToken", "XYZ!@#") // Parameters are token, websiteItemId
        );

        expect(mockStore.getActions()).toEqual([
          {
            type:
              websiteActionTypes.DASHBOARD__WEBSITE__DELETE_WEBSITE + "_PENDING"
          }
        ]);
      });

      it("Should dispatch DASHBOARD__WEBSITE__DELETE_WEBSITE_FULFILLED action when network request successfull.", () => {
        const serverResponse = { someServerResponse: "Hello" };

        // Mock any GET request to "website/add"
        axiosBaseMock.onDelete("website/delete").reply(200, serverResponse);

        return (
          mockStore
            .dispatch(
              websiteActions.deleteWebsite("myToken", "XYZ!@#") // Parameters are token, websiteItemId
            )
            // Action Finished
            .then(() => {
              // Using [1]st Index of mockStore.getActions() because [0]th index is aget filled by "USER___CREATE_ACCOUNT_PENDING" action.
              expect(mockStore.getActions()[1]).toEqual(
                expect.objectContaining({
                  type:
                    websiteActionTypes.DASHBOARD__WEBSITE__DELETE_WEBSITE +
                    "_FULFILLED"
                  // Payload Also Goes here (ex: payload: { serverResponse })
                })
              );

              // Make sure action filled with server response data.
              expect(mockStore.getActions()[1].payload.data).toEqual(
                serverResponse
              );
            })
        );
      });

      it("Should dispatch DASHBOARD__WEBSITE__DELETE_WEBSITE_REJECTED action & reduxFrom submission error when network request failed.", () => {
        axiosBaseMock.onDelete("website/delete").networkError();

        return (
          mockStore
            .dispatch(
              websiteActions.deleteWebsite("myToken", "XYZ!@#") // Parameters are token, websiteItemId
            )
            // Action Finished
            .catch(err => {
              expect(mockStore.getActions()[1]).toEqual(
                expect.objectContaining({
                  type:
                    websiteActionTypes.DASHBOARD__WEBSITE__ADD_WEBSITE +
                    "_REJECTED",
                  error: true
                })
              );
            })
        );
      });
    });
  });

  describe("WebsiteList Actions", () => {
    describe("When loadAllWebsiteLinks() is called", () => {
      it("Should dispatch DASHBOARD__WEBSITELIST__LOAD_ALL_PENDING action when network request initialized.", () => {
        axiosBaseMock.onGet("website/list?token=myToken").reply(200);

        mockStore.dispatch(websiteListActions.loadAllWebsiteLinks("myToken"));

        expect(mockStore.getActions()).toEqual([
          {
            type:
              websiteListActionTypes.DASHBOARD__WEBSITELIST__LOAD_ALL +
              "_PENDING"
          }
        ]);
      });

      it("Should dispatch DASHBOARD__WEBSITELIST__LOAD_ALL_FULFILLED action when network request successfull.", () => {
        const serverResponse = { someServerResponse: "Hello" };

        // Mock any GET request to "website/list"
        axiosBaseMock
          .onGet("website/list?token=myToken")
          .reply(200, serverResponse);

        return (
          mockStore
            .dispatch(websiteListActions.loadAllWebsiteLinks("myToken"))
            // Action Finished
            .then(() => {
              // Using [1]st Index of mockStore.getActions() because [0]th index is aget filled by "USER___CREATE_ACCOUNT_PENDING" action.
              expect(mockStore.getActions()[1]).toEqual(
                expect.objectContaining({
                  type:
                    websiteListActionTypes.DASHBOARD__WEBSITELIST__LOAD_ALL +
                    "_FULFILLED"
                  // Payload Also Goes here (ex: payload: { serverResponse })
                })
              );

              // Make sure action filled with server response data.
              expect(mockStore.getActions()[1].payload.data).toEqual(
                serverResponse
              );
            })
        );
      });

      it("Should dispatch DASHBOARD__WEBSITELIST__LOAD_ALL_REJECTED action & reduxFrom submission error when network request failed.", () => {
        axiosBaseMock.onPost("website/list?token=myToken").networkError();

        return (
          mockStore
            .dispatch(websiteListActions.loadAllWebsiteLinks("myToken"))
            // Action Finished
            .catch(err => {
              expect(mockStore.getActions()[1]).toEqual(
                expect.objectContaining({
                  type:
                    websiteListActionTypes.DASHBOARD__WEBSITELIST__LOAD_ALL +
                    "_REJECTED",
                  error: true
                })
              );

              // Make sure reduxForm specific submission error is thrown.
              expect(err.name).toEqual("SubmissionError");
            })
        );
      });
    });

    describe("When sortAndFailed() called.", () => {
      // Paramters arefullList, currentSortedAndFilteredList, selectedFilterTag, selectedFilterText, selectedSortTag, selectedSortOrderType;
      const defaultParameters = [[], [], "", "", "", ""];

      it("Should dispatch DASHBOARD__WEBSITELIST__SORT_AND_FILTER action.", () => {
        mockStore.dispatch(
          websiteListActions.sortAndFilter(...defaultParameters)
        );

        expect(mockStore.getActions()[0]).toEqual(
          expect.objectContaining({
            type: websiteListActionTypes.DASHBOARD__WEBSITELIST__SORT_AND_FILTER
          })
        );
      });

      it("Should return provided fulllist in payload when selectedFilterText param is empty.", () => {
        const fullList = [{ a: "hello" }];
        const selectedFilterText = "";

        mockStore.dispatch(
          websiteListActions.sortAndFilter(fullList, [], "", selectedFilterText)
        );

        expect(mockStore.getActions()[0]).toEqual(
          expect.objectContaining({
            type:
              websiteListActionTypes.DASHBOARD__WEBSITELIST__SORT_AND_FILTER,
            payload: fullList
          })
        );
      });

      it("Should return provided just filerdList in payload when specific orderType is not specified. (ex:descending)", () => {
        const fullList = [{ a: "hello" }];
        const selectedSortOrderType = "";

        mockStore.dispatch(
          websiteListActions.sortAndFilter(
            fullList,
            [],
            "",
            "",
            "",
            selectedSortOrderType
          )
        );

        expect(mockStore.getActions()[0]).toEqual(
          expect.objectContaining({
            type:
              websiteListActionTypes.DASHBOARD__WEBSITELIST__SORT_AND_FILTER,
            payload: fullList
          })
        );
      });

      it("Should return filtered and sorted list in payload when necessary parameter are provided.", () => {
        const fullList = [
            { a: "bed ship", b: "2" },
            { a: "cat", b: "1" },
            { a: "apple ship", b: "3" }
          ],
          currentSortedAndFilteredList = [],
          selectedFilterTag = "a",
          selectedFilterText = "ship",
          selectedSortTag = "b",
          selectedSortOrderType = "descending";

        mockStore.dispatch(
          websiteListActions.sortAndFilter(
            fullList,
            currentSortedAndFilteredList,
            selectedFilterTag,
            selectedFilterText,
            selectedSortTag,
            selectedSortOrderType
          )
        );

        expect(mockStore.getActions()[0]).toEqual(
          expect.objectContaining({
            type:
              websiteListActionTypes.DASHBOARD__WEBSITELIST__SORT_AND_FILTER,
            payload: [{ a: "bed ship", b: "2" }, { a: "apple ship", b: "3" }]
          })
        );
      });
    });
  });
});
