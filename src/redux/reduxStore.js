import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise-middleware";

import userReducer from "./reducers/userReducer";
import { reducer as formReducer } from "redux-form";

export const reducers = {
  user: userReducer,
  form: formReducer // For handle redux-form
};

export const initialState = {};

export const middlewares = [reduxThunk, reduxPromise()];

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

export default store;
