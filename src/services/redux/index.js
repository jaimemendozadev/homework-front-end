import { combineReducers } from "redux";
import reducers from "./reducers/index.js";

const rootReducer = combineReducers(reducers);

export default rootReducer;
