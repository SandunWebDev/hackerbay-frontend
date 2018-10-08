// Import this app's original reducers, middlewares, initialState etc.. and combine them with new reducer, middlewares, initialState, etc.. if provided and inject new store.

import React from "react";
import { Provider } from "react-redux";
import createMockStore from "../../tests/helpers/createMockStore";

export let store = {};

export default function injectReduxProvider(
  initialState,
  useProductionReduxStoreIntialStatesValues = true,
  useProductionReduxStoreItems = false,
  customValues
) {
  store = createMockStore(
    initialState,
    useProductionReduxStoreIntialStatesValues,
    useProductionReduxStoreItems,
    customValues
  );

  return story => {
    return <Provider store={store}>{story()}</Provider>;
  };
}
