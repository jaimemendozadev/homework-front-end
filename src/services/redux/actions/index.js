import {
  INIT_APP,
  GET_SEARCH_RESULTS,
  UPDATE_TRENDING_RESULTS,
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

// will have to add sort flag here
export const loadMoreData = (
  searchValue = null,
  newOffSet,
  gifData,
  gifIDSet,
  actionTypes
) => async dispatch => {
  dispatch({ type: actionTypes.scroll, payload: { scrolling: true } });
  const giphyResult = await updateGifFeed(searchValue, newOffSet, gifData);

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

  // Reattach searchValue
  if (searchValue !== null) {
    giphyResult.searchValue = searchValue;
  }

  // create actionObject that updates Redux based on type
  const actionObject = {};
  actionObject.type = actionTypes.type;
  actionObject.payload = giphyResult;

  dispatch(actionObject);
};

export const getGiphySearchResults = responsePayload => ({
  type: GET_SEARCH_RESULTS,
  payload: responsePayload
});

export const updateTrendingResults = payload => ({
  type: UPDATE_TRENDING_RESULTS,
  payload
});

export const initiateSorting = ({ type }, payload) => ({
  type,
  payload
});
