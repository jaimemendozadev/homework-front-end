import { INIT_APP, GET_SEARCH_RESULTS } from "./types.js";

export const appLoaded = () => ({
  type: INIT_APP,
  payload: {
    appStarted: true
  }
});

export const getGiphySearchResults = responsePayload => ({
  type: GET_SEARCH_RESULTS,
  payload: responsePayload
});
