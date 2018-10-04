import userReducer from "./userReducer";
import { actionTypes } from "../actions/userActions";

const defaultState = {
  loggedIn: false,
  name: "",
  email: "",
  token: ""
};

describe("userReducer", () => {
  it("Should return the initial state when reducer first initialzed.", () => {
    const state = userReducer(undefined, {});

    expect(state).toEqual(defaultState);
  });

  it("Should return the current state when provided action type doesn't have a match.", () => {
    const state = userReducer(
      { Hello: "World" },
      { type: "NOT_A_VALID_ACTION" }
    );

    expect(state).toEqual({ Hello: "World" });
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

    const state = userReducer(defaultState, {
      type: actionTypes.USER__CREATE_ACCOUNT + "_FULFILLED",
      payload
    });

    expect(state).toEqual({
      ...defaultState,
      loggedIn: true,
      name: "John Doe",
      email: "johndoe@gmail.com",
      token: "ABCD123XYZ"
    });
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

    const state = userReducer(defaultState, {
      type: actionTypes.USER__LOGIN_ACCOUNT + "_FULFILLED",
      payload
    });

    expect(state).toEqual({
      ...defaultState,
      loggedIn: true,
      name: "John Doe",
      email: "johndoe@gmail.com",
      token: "ABCD123XYZ"
    });
  });

  it("Should handle USER__LOGOUT_ACCOUNT.", () => {
    const state = userReducer(defaultState, {
      type: actionTypes.USER__LOGOUT_ACCOUNT
    });

    expect(state).toEqual(defaultState);
  });
});
