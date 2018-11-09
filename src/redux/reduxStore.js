import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise-middleware";
import webStorageSync from "./middlewares/webStorageSync";

import userReducer from "./reducers/userReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import { reducer as formReducer } from "redux-form";

import { getReduxStateFromWebStorage } from "./helpers/webStorage";

// This is "ONLY" just for the "TEST CASE" purposes. Directly used by "createMockStore()" function.
export const allDefaultStatesFromReducers = {};

export const reducers = {
  user: userReducer,
  dashboard: dashboardReducer,
  form: formReducer // For handle redux-form
};

export const initialState = getReduxStateFromWebStorage();

export const middlewares = [reduxThunk, reduxPromise(), webStorageSync()];

export const enhancers = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(reduxLogger);

  const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof reduxDevToolsExtension === "function") {
    enhancers.push(reduxDevToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, initialState, composedEnhancers);

// This is "ONLY" for the "TESTING" purposes of app. Directly used by "createMockStore()"
export const allRedcuersDefaultState = store.getState();

export default store;
