import React from "react";
import { Redirect } from "react-router-dom";

export default function securePage(
  isSecured = false,
  OnSuccess = () => <div>Secured Page</div>,
  OnFailure = "/"
) {
  // Getting "isSecured" as argument instead of just getting directly from store because that makes testing easier.
  // OnSuccess arguments must be a "React Component" (Not React Element) and OnFailure must be string which is a Redirect Path.

  if (isSecured) {
    return <OnSuccess />;
  } else {
    return <Redirect to={OnFailure} />;
  }
}
