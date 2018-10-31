import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise-middleware";

import userReducer from "./reducers/userReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer // For handle redux-form
});

const middlewares = [reduxThunk, reduxPromise()];

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);

  const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof reduxDevToolsExtension === "function") {
    enhancers.push(reduxDevToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
