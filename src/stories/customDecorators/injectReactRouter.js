import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function injectReactRouter() {
  return story => <BrowserRouter>{story()}</BrowserRouter>;
}
