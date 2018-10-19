import { combineReducers, createStore, applyMiddleware } from "redux";

import reducers from "./reducers/index.js";

const rootReducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
