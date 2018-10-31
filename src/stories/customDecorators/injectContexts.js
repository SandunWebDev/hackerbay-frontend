import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import createMockStore from "../../tests/helpers/createMockStore";

/* Utility that wrap component with Redux Router.*/
export function injectReactRouter() {
  return story => <BrowserRouter>{story()}</BrowserRouter>;
}

/* Utility that wrap component with Redux Provider. If no specific parameters passed by default this inject a store similar to production redux store.
  See createMockStore() utility for more options.
*/
export function injectReduxProvider(
  initialState = {},
  useProductionReduxStoreIntialStatesValues = false,
  useProductionReduxStoreItems = true,
  customValues = {}
) {
  const mockStore = createMockStore(
    initialState,
    useProductionReduxStoreIntialStatesValues,
    useProductionReduxStoreItems,
    customValues
  );

  return story => {
    return <Provider store={mockStore}>{story()}</Provider>;
  };
}

export function injectReduxAndRouter(
  initialState = {},
  useProductionReduxStoreIntialStatesValues = false,
  useProductionReduxStoreItems = true,
  customValues = {}
) {
  const mockStore = createMockStore(
    initialState,
    useProductionReduxStoreIntialStatesValues,
    useProductionReduxStoreItems,
    customValues
  );

  return story => {
    return (
      <Provider store={mockStore}>
        <BrowserRouter>{story()}</BrowserRouter>
      </Provider>
    );
  };
}
