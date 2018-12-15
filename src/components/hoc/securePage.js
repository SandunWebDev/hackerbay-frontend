import React from "react";
import { Redirect } from "react-router-dom";

export default function securePage(
  isSecured = false,
  onSuccessComponent = <div>Secured Page</div>,
  onFailureRedirect = "/"
) {
  // Getting "isSecured" as argument instead of just getting directly from store because that makes testing easier.
  // OnSuccess arguments must be passed as React Element (<Abc />) NOT as React Component Function and OnFailure must be string which is a Redirect Path.

  if (isSecured) {
    return onSuccessComponent;
  } else {
    return <Redirect to={onFailureRedirect} />;
  }
}
