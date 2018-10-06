import userReducer from "./userReducer";
import deepFreeze from "deep-freeze";
import { actionTypes } from "../actions/userActions";

const defaultState = {
  loggedIn: false,
  name: "",
  email: "",
  token: ""
};

const loggedInState = {
  ...defaultState,
  loggedIn: true,
  name: "John Doe",
  email: "johndoe@gmail.com",
  token: "ABCD123XYZ"
};

describe("userReducer", () => {
  it("Should return the initial state when reducer first initialzed.", () => {
    const stateAfter = userReducer(undefined, {});

    expect(stateAfter).toEqual(defaultState);
  });

  it("Should return the current state when provided action type doesn't have a match.", () => {
    const stateBefore = { Hello: "World" };
    deepFreeze(stateBefore);

    const stateAfter = userReducer(stateBefore, { type: "NOT_A_VALID_ACTION" });

    expect(stateAfter).toEqual(stateBefore);
  });

  it("Should handle USER__CREATE_ACCOUNT_FULFILLED.", () => {
    const payload = {
      data: {
        success: true,
        name: "John Doe",
        email: "johndoe@gmail.com",
        session: "ABCD123XYZ"
      }
    };

    const stateBefore = defaultState;
    deepFreeze(stateBefore);

    const stateAfter = userReducer(stateBefore, {
      type: actionTypes.USER__CREATE_ACCOUNT + "_FULFILLED",
      payload
    });

    expect(stateAfter).toEqual(loggedInState);
  });

  it("Should handle USER__LOGIN_ACCOUNT_FULFILLED.", () => {
    const payload = {
      data: {
        success: true,
        name: "John Doe",
        email: "johndoe@gmail.com",
        session: "ABCD123XYZ"
      }
    };

    const stateBefore = defaultState;
    deepFreeze(stateBefore);

    const stateAfter = userReducer(stateBefore, {
      type: actionTypes.USER__LOGIN_ACCOUNT + "_FULFILLED",
      payload
    });

    expect(stateAfter).toEqual(loggedInState);
  });

  it("Should handle USER__LOGOUT_ACCOUNT.", () => {
    const stateBefore = loggedInState;
    deepFreeze(stateBefore);

    const stateAfter = userReducer(stateBefore, {
      type: actionTypes.USER__LOGOUT_ACCOUNT
    });

    expect(stateAfter).toEqual(defaultState);
  });
});
