import { store } from "../customDecorators/injectReduxProvider";

export const dispatchAction = (action = { type: "" }) => {
  store.dispatch(action);
};

export const dispatchActionLater = (action = { type: "" }, time = 0) => {
  setTimeout(() => {
    store.dispatch(action);
  }, time);
};
