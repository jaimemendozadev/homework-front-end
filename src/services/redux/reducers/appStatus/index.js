import {
  INIT_APP,
  SWITCH_TO_SEARCH_MODE,
  SWITCH_TO_TRENDING_MODE,
  SORT_TRENDING,
  SORT_SEARCH
} from "../../actions/types.js";

const defaultAppStatusState = {
  appStarted: false,
  inTrendingMode: false,
  inSearchMode: false,
  ascendingSort: false,
  descendingSort: false
};

const appStatus = (state = defaultAppStatusState, action) => {
  switch (action.type) {
    case INIT_APP:
      return Object.assign({}, state, action.payload.appStatus);

    case SWITCH_TO_SEARCH_MODE:
      return Object.assign({}, state, action.payload.appStatus);

    // appStatus = { inSearchMode: false, inTrendingMode: true };
    case SWITCH_TO_TRENDING_MODE:
      return Object.assign({}, state, action.payload.appStatus);

    case SORT_TRENDING:
      return Object.assign({}, state, action.payload.appStatus);

    case SORT_SEARCH:
      return Object.assign({}, state, action.payload.appStatus);

    default:
      return state;
  }
};

export default appStatus;
