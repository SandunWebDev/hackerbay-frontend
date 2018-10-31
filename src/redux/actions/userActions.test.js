import { actionTypes } from "./userActions";
import * as userActions from "./userActions";

import createMockStore from "../../tests/helpers/createMockStore";
import axiosMockAdapter from "axios-mock-adapter";
import { axiosBase } from "../../configs/axiosInstances";

const axiosBaseMock = new axiosMockAdapter(axiosBase);

/*
  We could have do above mocking system manually like below.

  const mockedAxiosBase = jest.spyOn(axiosBase, "post");
  mockedAxiosBase.mockReturnValue(
    Promise.resolve({
      data: {
        sucess: true,
        name: "John Doe",
        email: "johndoe@gmail.com",
        session: "supersecret"
      }
    })
  );
*/

const paramsFromReduxForm = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  password: "supersecret"
};

describe("userReducer", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore({});
  });

  afterEach(() => {
    axiosBaseMock.reset();
  });

  describe("When logoutAccount() is called", () => {
    it("Should dispatch USER__LOGOUT_ACCOUNT action.", () => {
      expect(userActions.logoutAccount()).toEqual({
        type: actionTypes.USER__LOGOUT_ACCOUNT
      });
    });
  });

  describe("When createAccount() is called", () => {
    it("Should dispatch USER__CREATE_ACCOUNT_PENDING when network request initizlized.", () => {
      axiosBaseMock.onPost("user/signup").reply(200);

      mockStore.dispatch(userActions.createAccount(paramsFromReduxForm));

      expect(mockStore.getActions()).toEqual([
        { type: "USER___CREATE_ACCOUNT_PENDING" }
      ]);
    });

    it("Should dispatch USER__CREATE_ACCOUNT_FULFILLED action with appopriate data when user successful created.", () => {
      const responseData = {
        sucess: true,
        name: "John Doe",
        email: "johndoe@gmail.com",
        session: "supersecret"
      };

      // Mock any GET request to "/users/signup"
      axiosBaseMock.onPost("user/signup").reply(200, responseData);

      return (
        mockStore
          .dispatch(userActions.createAccount(paramsFromReduxForm))
          // Action Finished
          .then(() => {
            // Using [1]st Index of mockStore.getActions() because [0]th index is aget filled by "USER___CREATE_ACCOUNT_PENDING" action.
            expect(mockStore.getActions()[1]).toEqual(
              expect.objectContaining({
                type: "USER___CREATE_ACCOUNT_FULFILLED"
              })
            );

            // Make sure action filled with appoprate data.
            expect(mockStore.getActions()[1].payload.data).toEqual(
              responseData
            );
          })
      );
    });

    it("Should dispatch USER__CREATE_ACCOUNT_REJECTED action & reduxFrom submission error when network error occured.", () => {
      axiosBaseMock.onPost("user/signup").networkError();

      return (
        mockStore
          .dispatch(userActions.createAccount(paramsFromReduxForm))
          // Action Finished
          .catch(err => {
            expect(mockStore.getActions()[1]).toEqual(
              expect.objectContaining({
                type: "USER___CREATE_ACCOUNT_REJECTED",
                error: true
              })
            );

            // Make sure reduxForm specific submission error is thrown.
            expect(err.name).toEqual("SubmissionError");
          })
      );
    });

    it("Should dispatch USER__CREATE_ACCOUNT_REJECTED action & reduxFrom submission error when specific error is thrown from server like user exist.", () => {
      const responseData = {
        sucess: false,
        errMsg: "User exist already."
      };

      // Mock any GET request to "/users/signup"
      axiosBaseMock.onPost("user/signup").reply(400, responseData);

      return (
        mockStore
          .dispatch(userActions.createAccount(paramsFromReduxForm))
          // Action Finished
          .catch(err => {
            expect(mockStore.getActions()[1]).toEqual(
              expect.objectContaining({
                type: "USER___CREATE_ACCOUNT_REJECTED",
                error: true
              })
            );

            // Make sure reduxForm specific submission error is thrown.
            expect(err.name).toEqual("SubmissionError");
          })
      );
    });
  });

  describe("When loginAccount() is called", () => {
    it("Should dispatch USER__LOGIN_ACCOUNT_PENDING when network request initizlized.", () => {
      axiosBaseMock.onPost("user/login").reply(200);

      mockStore.dispatch(userActions.loginAccount(paramsFromReduxForm));
      expect(mockStore.getActions()).toEqual([
        { type: "USER___LOGIN_ACCOUNT_PENDING" }
      ]);
    });

    it("Should dispatch USER__LOGIN_ACCOUNT_FULFILLED action with appopriate data when user successful logged.", () => {
      const responseData = {
        sucess: true,
        name: "John Doe",
        email: "johndoe@gmail.com",
        session: "supersecret"
      };

      // Mock any GET request to "/users/signup"
      axiosBaseMock.onPost("user/login").reply(200, responseData);

      return (
        mockStore
          .dispatch(userActions.loginAccount(paramsFromReduxForm))
          // Action Finished
          .then(() => {
            // Using [1]st Index of mockStore.getActions() because [0]th index is aget filled by "USER___LOGIN_ACCOUNT_PENDING" action.
            expect(mockStore.getActions()[1]).toEqual(
              expect.objectContaining({
                type: "USER___LOGIN_ACCOUNT_FULFILLED"
              })
            );

            // Make sure action filled with appoprate data.
            expect(mockStore.getActions()[1].payload.data).toEqual(
              responseData
            );
          })
      );
    });

    it("Should dispatch USER__LOGIN_ACCOUNT_REJECTED action & reduxFrom submission error when network error occured.", () => {
      axiosBaseMock.onPost("user/login").networkError();

      return (
        mockStore
          .dispatch(userActions.loginAccount(paramsFromReduxForm))
          // Action Finished
          .catch(err => {
            expect(mockStore.getActions()[1]).toEqual(
              expect.objectContaining({
                type: "USER___LOGIN_ACCOUNT_REJECTED",
                error: true
              })
            );

            // Make sure reduxForm specific submission error is thrown.
            expect(err.name).toEqual("SubmissionError");
          })
      );
    });

    it("Should dispatch USER__LOGIN_ACCOUNT_REJECTED action & reduxFrom submission error when specific error is thrown from server, like user exist.", () => {
      const responseData = {
        sucess: false,
        errMsg: "User exist already."
      };

      // Mock any GET request to "/users/signup"
      axiosBaseMock.onPost("user/login").reply(400, responseData);

      return (
        mockStore
          .dispatch(userActions.loginAccount(paramsFromReduxForm))
          // Action Finished
          .catch(err => {
            expect(mockStore.getActions()[1]).toEqual(
              expect.objectContaining({
                type: "USER___LOGIN_ACCOUNT_REJECTED",
                error: true
              })
            );

            // Make sure reduxForm specific submission error is thrown.
            expect(err.name).toEqual("SubmissionError");
          })
      );
    });
  });
});
