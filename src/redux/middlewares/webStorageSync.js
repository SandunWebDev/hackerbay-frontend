export default function webStorageSync() {
  return store => next => action => {
    next(action); // Make sure this action get executed & we get state after it.

    const currentStateAsString = JSON.stringify(store.getState());

    if (typeof Storage !== "undefined") {
      localStorage.setItem("reduxState", currentStateAsString);
    } else {
      // No Web Storage support. Should implement fallback to cookies.
    }
  };
}
