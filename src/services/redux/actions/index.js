import { INIT_APP, GET_SEARCH_RESULTS } from "./types.js";

export const appLoaded = payload => ({
  type: INIT_APP,
  payload
});

export const getGiphySearchResults = responsePayload => ({
  type: GET_SEARCH_RESULTS,
  payload: responsePayload
});
