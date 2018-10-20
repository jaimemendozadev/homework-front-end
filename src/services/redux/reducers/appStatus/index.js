import { INIT_APP, SWITCH_TO_SEARCH_MODE } from "../../actions/types.js";

const defaultAppStatusState = {
  appStarted: false,
  inTrendingMode: false,
  inSearchMode: false
};

const appStatus = (state = defaultAppStatusState, action) => {
  switch (action.type) {
    case INIT_APP:
      return Object.assign({}, state, action.payload.appStatus);

    case SWITCH_TO_SEARCH_MODE:
      return Object.assign({}, state, action.payload.appStatus);

    default:
      return state;
  }
};

export default appStatus;
