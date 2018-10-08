// This is a helper utility for "React Testing Library" which inject Redux Store and Router contexts.

import React from "react";
import { render } from "react-testing-library";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import createMockStore from "./createMockStore";
const mockStore = createMockStore({});

export const customRender = (node, ...options) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>{node}</BrowserRouter>
    </Provider>,
    ...options
  );
};
