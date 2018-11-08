import React from "react";
import { Redirect } from "react-router-dom";

import store from "../../redux/reduxStore";

export default function securePage(Component, redirectTo = "/") {
  const isLoggedIn = store.getState().user.loggedIn;

  return class extends React.Component {
    render() {
      if (isLoggedIn) {
        return <Component />;
      } else {
        return <Redirect to={redirectTo} />;
      }
    }
  };
}
