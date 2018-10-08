import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import createMockStore from "./createMockStore";

export const withReduxProvider = (
  component,
  initialState = {},
  useProductionReduxStoreIntialStatesValues = false,
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

export const withReactRouter = component => {
  return <BrowserRouter>{component}</BrowserRouter>;
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
