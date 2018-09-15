import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";

import userReducer from "./reducers/userReducer";
import initialState from "./reduxStoreInitialState";

const rootReducer = combineReducers({
  user: userReducer
});

const middlewares = applyMiddleware(logger);

// Just For Accessing Redux Dev Tools.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(middlewares)
);

export default store;
