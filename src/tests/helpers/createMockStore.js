import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reduxPromise from "redux-promise-middleware";

const middleware = [thunk, reduxPromise()];
const createMockStore = configureMockStore(middleware);

export default createMockStore;
