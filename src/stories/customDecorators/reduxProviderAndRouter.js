import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../redux/reduxStore";

export default function reduxProvider(story) {
  return (
    <Provider store={store}>
      <BrowserRouter>{story()}</BrowserRouter>
    </Provider>
  );
}
