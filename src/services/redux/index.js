import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { combineReducers, createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index.js";

const logger = createLogger({
  logErrors: true
});

const rootReducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
