import {
  INIT_APP,
  GET_SEARCH_RESULTS,
  UPDATE_TRENDING_RESULTS,
  SCROLLING_TRUE,
  SWITCH_TO_SEARCH_MODE
} from "./types.js";

import { updateGifFeed } from "../../giphy/index.js";

export const appLoaded = payload => ({
  type: INIT_APP,
  payload
});

export const switchToSearchMode = payload => ({
  type: SWITCH_TO_SEARCH_MODE,
  payload
});

export const loadMoreTrendingData = oldState => {
  const { offset, gifData, gifIDSet } = oldState;
  const newOffSet = offset + 25;

  return async dispatch => {
    dispatch({ type: SCROLLING_TRUE, payload: { scrolling: true } });
    const giphyResult = await updateGifFeed(null, newOffSet, gifData);

    // Use gifIDSet to sanitize gifData & avoid getting dupe gif data objects
    const filteredGifs = giphyResult.gifData.map(gif => {
      const { id } = gif;

      if (!gifIDSet[id]) {
        gifIDSet[id] = true;

        return gif;
      }
    });

    // Merge old gifData and filteredGifs
    giphyResult.gifData = [...gifData, ...filteredGifs];

    // Add updated gifIDSet to Redux
    giphyResult.gifIDSet = gifIDSet;

    dispatch({
      type: UPDATE_TRENDING_RESULTS,
      payload: giphyResult
    });
  };
};

export const getGiphySearchResults = responsePayload => ({
  type: GET_SEARCH_RESULTS,
  payload: responsePayload
});

export const updateTrendingResults = payload => ({
  type: UPDATE_TRENDING_RESULTS,
  payload
});
