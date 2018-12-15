export function getReduxStateFromWebStorage() {
  if (typeof Storage !== "undefined") {
    const localStorageState = localStorage.getItem("reduxState");

    if (localStorageState === null) {
      return {};
    } else {
      return JSON.parse(localStorageState);
    }
  } else {
    return {};
    // No Web Storage support. Also should implement fallback to cookies.
  }
}
