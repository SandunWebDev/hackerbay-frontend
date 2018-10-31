import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import reduxStore from "./redux/reduxStore";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/root/App/App";
import "./index.css";

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
