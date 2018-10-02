// Import this app's original reducers, middlewares, initialState etc.. and combine them with new reducer, middlewares, initialState, etc.. if provided and inject new store.

import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import {
  initialState,
  reducers,
  middlewares,
  enhancers
} from "../../redux/reduxStore";

export let store = {};

export default function injectReduxProvider(
  customState = {},
  customReducers = () => {}
) {
  const newInitialState = { ...initialState, ...customState };

  const rootReducer = combineReducers({ ...reducers, ...customReducers });

  const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  store = createStore(rootReducer, newInitialState, composedEnhancers);

  return story => {
    return <Provider store={store}>{story()}</Provider>;
  };
}
