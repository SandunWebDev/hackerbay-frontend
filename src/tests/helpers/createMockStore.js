import configureMockStore from "redux-mock-store";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

/*Importing Production redux store parts. Normal values would be,

  initialState = {},
  reducers = ALL REDUCERS
  middewares = [reduxThunk, reduxPromise] <-- (Redux Logger only availbale in "development mode". Like in Storybook Or Dev Server. Add manually if want.)
  enhancers = [] <-- (Redux Dev tools only available in browser with redux addon only.  Like in Storybook Or Dev Server. Like in  Add manually if want.)

*/
import * as productionReduxStore from "../../redux/reduxStore";

import { userReducerDefaultState } from "../../redux/reducers/userReducer";

const allProductionDefaultStates = { user: userReducerDefaultState };

/* Main utility that use to create mock stores for test cases.

  If only initalState is passed this returns simple mock store using "redux-mock-store".
  If initialState + useProductionReduxStoreIntialStatesValues = true this returns simple mock store using "redux-mock-store" with production redux store initial values.
  If useProductionReduxStoreItems is passed this returns mock store similar to production redux store according to below "createCustomStoreWithProductionStore" function. 
*/

export default function createMockStore(
  initialState = {},
  useProductionReduxStoreIntialStatesValues = false,
  useProductionReduxStoreItems = false,
  customValues = {}
) {
  if (useProductionReduxStoreItems === false) {
    const mockStore = configureMockStore(productionReduxStore.middlewares);

    if (useProductionReduxStoreIntialStatesValues) {
      return mockStore({ ...allProductionDefaultStates, ...initialState });
    } else {
      return mockStore(initialState);
    }
  } else {
    return createCustomStoreWithProductionStore(
      initialState,
      true,
      customValues
    );
  }
}

// Custome utility to create custom store with original production redux store values.
export function createCustomStoreWithProductionStore(
  customState = {},
  useProductionReduxStoreItems = true,
  customValues = {}
) {
  const {
    customReducers = {},
    customMiddlewares = [],
    customEnhancers = []
  } = customValues;

  if (
    (typeof useProductionReduxStoreItems === "boolean") &
    (useProductionReduxStoreItems === false)
  ) {
    // Discarding all parts of production redux stores if specified.
    productionReduxStore.initialState = {};
    productionReduxStore.reducers = { NOT_A_REAL_REDUCER: () => null }; // Passing non-sence reducer beacuse if "combineReducers()" used, it must have at least one reducer. Also note that if "combineReducers()" used given "initalState" must be similar to reducer outline.
    productionReduxStore.middlewares = [];
    productionReduxStore.enhancers = [];
  } else if (typeof useProductionReduxStoreItems === "object") {
    // Manually discarding individial production redux stores parts if specified.
    if (useProductionReduxStoreItems.productionInitialState === false) {
      productionReduxStore.initialState = {};
    }
    if (useProductionReduxStoreItems.productionReducers === false) {
      productionReduxStore.reducers = { NOT_A_REAL_REDUCER: () => null };
    }
    if (useProductionReduxStoreItems.productionMiddlewares === false) {
      productionReduxStore.middlewares = [];
    }
    if (useProductionReduxStoreItems.productionEnhancers === false) {
      productionReduxStore.enhancers = [];
    }
  }

  const newInitialState = {
    ...productionReduxStore.initialState,
    ...customState
  };

  const newRootReducer = combineReducers({
    ...productionReduxStore.reducers,
    ...customReducers
  });

  const newEnhancers = [...productionReduxStore.enhancers, ...customEnhancers];

  const composedEnhancers = compose(
    applyMiddleware(...productionReduxStore.middlewares, ...customMiddlewares),
    ...newEnhancers
  );

  return createStore(newRootReducer, newInitialState, composedEnhancers);
}
