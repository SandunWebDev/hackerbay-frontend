import dashboardReducer from "./dashboardReducer";
import deepFreeze from "deep-freeze";
import { actionTypes } from "../actions/dashboardActions";

const defaultState = {
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

describe("Reducer/dashboardReducer", () => {
  it("Should return the initial state when reducer first initialzed.", () => {
    const stateAfter = dashboardReducer(undefined, {});

    expect(stateAfter).toEqual(defaultState);
  });

  it("Should return the current state when provided action type doesn't have a match.", () => {
    const stateBefore = { Hello: "World" };
    deepFreeze(stateBefore);

    const stateAfter = dashboardReducer(stateBefore, {
      type: "NOT_A_VALID_ACTION"
    });

    expect(stateAfter).toEqual(stateBefore);
  });

  /* ----- WebsiteList Reducers----*/
  describe("WebsiteList", () => {
    it("Should handle DASHBOARD__WEBSITELIST__LOAD_ALL__PENDING.", () => {
      const stateBefore = defaultState;
      deepFreeze(stateBefore);

      const stateAfter = dashboardReducer(stateBefore, {
        type:
          actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL + "_PENDING"
      });

      expect(stateAfter).toEqual({
        ...defaultState,
        websiteList: {
          ...defaultState.websiteList,
          isFetching: true
        }
      });
    });

    it("Should handle DASHBOARD__WEBSITELIST__LOAD_ALL__FULFILLED.", () => {
      const payload = {
        data: {
          result: [
            {
              websiteName: "Google",
              url: "https://google.com",
              onlineStatus: "true",
              createdAt: new Date("2018-10-05"),
              updatedAt: new Date("2018-10-06")
            }
          ]
        }
      };

      const stateBefore = defaultState;
      deepFreeze(stateBefore);

      const stateAfter = dashboardReducer(stateBefore, {
        type:
          actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL +
          "_FULFILLED",
        payload
      });

      expect(stateAfter).toEqual({
        ...defaultState,
        websiteList: {
          ...defaultState.websiteList,
          isFetching: false,
          error: "",
          fullList: payload.data.result,
          sortedAndFilteredList: payload.data.result
        }
      });
    });

    it("Should handle DASHBOARD__WEBSITELIST__LOAD_ALL__REJECTED.", () => {
      const payload = {
        // There is lot of ways error comes in. But this is the most basic way.
        message: "Some Error Occured"
      };

      const stateBefore = defaultState;
      deepFreeze(stateBefore);

      const stateAfter = dashboardReducer(stateBefore, {
        type:
          actionTypes.websiteList.DASHBOARD__WEBSITELIST__LOAD_ALL +
          "_REJECTED",
        payload
      });

      expect(stateAfter).toEqual({
        ...defaultState,
        websiteList: {
          ...defaultState.websiteList,
          isFetching: false,
          error: "Some Error Occured",
          fullList: []
        }
      });
    });

    it("Should handle DASHBOARD__WEBSITELIST__SORT_AND_FILTER.", () => {
      // Payload should be array of website data.
      const payload = [{ a: "hello" }];

      const stateBefore = defaultState;
      deepFreeze(stateBefore);

      const stateAfter = dashboardReducer(stateBefore, {
        type: actionTypes.websiteList.DASHBOARD__WEBSITELIST__SORT_AND_FILTER,
        payload
      });

      expect(stateAfter).toEqual({
        ...defaultState,
        websiteList: {
          ...defaultState.websiteList,
          sortedAndFilteredList: payload
        }
      });
    });
  });

  /* ----- Website Reducers----*/
  describe("Website", () => {
    describe("DASHBOARD__WEBSITE__ADD_WEBSITE", () => {
      it("Should handle DASHBOARD__WEBSITE__ADD_WEBSITE__PENDING.", () => {
        const stateBefore = defaultState;
        deepFreeze(stateBefore);

        const stateAfter = dashboardReducer(stateBefore, {
          type: actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE + "_PENDING"
        });

        expect(stateAfter).toEqual({
          ...defaultState,
          addWebsite: {
            ...defaultState.addWebsite,
            isFetching: true
          }
        });
      });

      it("Should handle DASHBOARD__WEBSITE__ADD_WEBSITE__FULFILLED.", () => {
        const payload = {
          data: {
            added: [
              {
                websiteName: "Google",
                url: "https://google.com",
                onlineStatus: "true",
                createdAt: new Date("2018-10-05"),
                updatedAt: new Date("2018-10-06")
              }
            ]
          }
        };

        const stateBefore = defaultState;
        deepFreeze(stateBefore);

        const stateAfter = dashboardReducer(stateBefore, {
          type:
            actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE + "_FULFILLED",
          payload
        });

        expect(stateAfter).toEqual({
          ...defaultState,
          websiteList: {
            ...defaultState.websiteList,
            fullList: [
              ...defaultState.websiteList.fullList,
              payload.data.added
            ],
            sortedAndFilteredList: [
              ...defaultState.websiteList.fullList,
              payload.data.added
            ]
          },
          addWebsite: {
            ...defaultState.addWebsite,
            isFetching: false,
            error: "",
            success: true,
            addedWebsite: payload.data.added
          }
        });
      });

      it("Should handle DASHBOARD__WEBSITE__ADD_WEBSITE__REJECTED.", () => {
        const payload = {
          // There is lot of ways error comes in. But this is the most basic way.
          message: "Some Error Occured"
        };

        const stateBefore = defaultState;
        deepFreeze(stateBefore);

        const stateAfter = dashboardReducer(stateBefore, {
          type:
            actionTypes.website.DASHBOARD__WEBSITE__ADD_WEBSITE + "_REJECTED",
          payload
        });

        expect(stateAfter).toEqual({
          ...defaultState,
          addWebsite: {
            ...defaultState.addWebsite,
            isFetching: false,
            error: "Some Error Occured",
            success: false,
            addedWebsite: ""
          }
        });
      });
    });

    describe("DASHBOARD__WEBSITE__DELETE_WEBSITE", () => {
      it("Should handle DASHBOARD__WEBSITE__DELETE_WEBSITE__PENDING.", () => {
        const stateBefore = defaultState;
        deepFreeze(stateBefore);

        const stateAfter = dashboardReducer(stateBefore, {
          type:
            actionTypes.website.DASHBOARD__WEBSITE__DELETE_WEBSITE + "_PENDING"
        });

        expect(stateAfter).toEqual({
          ...defaultState,
          deleteWebsite: {
            ...defaultState.deleteWebsite,
            isFetching: true
          }
        });
      });

      it("Should handle DASHBOARD__WEBSITE__DELETE_WEBSITE__FULFILLED.", () => {
        const stateBefore = {
          ...defaultState,
          websiteList: {
            ...defaultState.websiteList,
            fullList: [{ id: 1 }, { id: 2 }, { id: 3 }],
            sortedAndFilteredList: [{ id: 1 }, { id: 2 }, { id: 3 }]
          }
        };
        deepFreeze(stateBefore);

        const stateAfter = dashboardReducer(stateBefore, {
          type:
            actionTypes.website.DASHBOARD__WEBSITE__DELETE_WEBSITE +
            "_FULFILLED",
          payload: {
            data: {
              deletedWebsiteItemId: 2 // Mocking server response that delete id2 item.
            }
          }
        });

        expect(stateAfter).toEqual({
          ...defaultState,
          deleteWebsite: {
            ...defaultState.deleteWebsite,
            isFetching: false,
            error: "",
            success: true
          },
          websiteList: {
            ...defaultState.websiteList,
            fullList: [{ id: 1 }, { id: 3 }],
            sortedAndFilteredList: [{ id: 1 }, { id: 3 }]
          }
        });
      });

      it("Should handle DASHBOARD__WEBSITE__DELETE_WEBSITE__REJECTED.", () => {
        const payload = {
          // There is lot of ways error comes in. But this is the most basic way.
          message: "Some Error Occured"
        };

        const stateBefore = defaultState;
        deepFreeze(stateBefore);

        const stateAfter = dashboardReducer(stateBefore, {
          type:
            actionTypes.website.DASHBOARD__WEBSITE__DELETE_WEBSITE +
            "_REJECTED",
          payload
        });

        expect(stateAfter).toEqual({
          ...defaultState,
          deleteWebsite: {
            ...defaultState.deleteWebsite,
            isFetching: false,
            error: "Some Error Occured",
            success: false
          }
        });
      });
    });
  });
});
