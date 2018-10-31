import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import createMockStore from "./createMockStore";

export const withReactRouter = component => {
  return <BrowserRouter>{component}</BrowserRouter>;
};

/* Utility that wrap component with Redux Provider and inject mock store.

  If only component parameter is passed, By deafult this returns simple mock store using "redux-mock-store" filled with production redux stores default values.
  See implementaion of createMockStore() for more info.
*/

export const withReduxProvider = (
  component,
  initialState = {},
  useProductionReduxStoreIntialStatesValues = true,
  useProductionReduxStoreItems = false,
  customValues = {}
) => {
  const mockStore = createMockStore(
    initialState,
    useProductionReduxStoreIntialStatesValues,
    useProductionReduxStoreItems,
    customValues
  );

  return <Provider store={mockStore}>{component}</Provider>;
};

export const withReduxAndRouter = (
  component,
  initialState = {},
  useProductionReduxStoreIntialStatesValues = true,
  useProductionReduxStoreItems = false,
  customValues = {}
) => {
  const mockStore = createMockStore(
    initialState,
    useProductionReduxStoreIntialStatesValues,
    useProductionReduxStoreItems,
    customValues
  );
  return (
    <Provider store={mockStore}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};
