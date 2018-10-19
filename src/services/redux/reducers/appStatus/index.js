import { INIT_APP } from "../../actions/types.js";

const defaultAppStatusState = {
  appStarted: false
};

const appStatus = (state = defaultAppStatusState, action) => {
  switch (action.type) {
    case INIT_APP:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default appStatus;
