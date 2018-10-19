import { INIT_APP } from "./types.js";

export const appLoaded = () => ({
  type: INIT_APP,
  payload: {
    appStarted: true
  }
});
