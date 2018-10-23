import {
  INIT_APP,
  GET_SEARCH_RESULTS,
  UPDATE_TRENDING_RESULTS,
  SWITCH_TO_SEARCH_MODE,
  RESET_SORTING
} from "./types.js";
import { mergeSort } from "../../../app/components/utils.js";

import { updateGifFeed, makeInitRequest } from "../../giphy/index.js";
import { createInitAppData } from "../../../app/utils.js";

export const appLoaded = payload => ({
  type: INIT_APP,
  payload
});

export const switchToSearchMode = payload => ({
  type: SWITCH_TO_SEARCH_MODE,
  payload
});

export const loadMoreData = (
  searchValue = null,
  newOffSet,
  gifData,
  gifIDSet,
  actionTypes,
  direction
) => async dispatch => {
  const currentIDSet = gifIDSet;

  dispatch({ type: actionTypes.scroll, payload: { scrolling: true } });

  const giphyResult = await updateGifFeed(searchValue, newOffSet);

  // Use gifIDSet to sanitize gifData & avoid getting dupe gif data objects
  const filteredGifs = [];

  giphyResult.gifData.forEach(gif => {
    const { id } = gif;

    if (!currentIDSet[id]) {
      currentIDSet[id] = true;

      filteredGifs.push(gif);
    }
  });

  // Either merge old gifData & filteredGifs or
  // mergeSort if direction arg is passed
  giphyResult.gifData =
    direction === "Asc" || direction === "Dsc"
      ? mergeSort([...gifData, ...filteredGifs], direction)
      : [...gifData, ...filteredGifs];

  // Add updated gifIDSet to Redux
  giphyResult.gifIDSet = currentIDSet;

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

export const resetSorting = () => {
  const payload = {
    appStatus: {
      inTrendingMode: true,
      inSearchMode: false,
      ascendingSort: false,
      descendingSort: false
    }
  };

  return async dispatch => {
    const giphyResults = await makeInitRequest(null, 0);

    const resetState = createInitAppData(giphyResults);

    payload.trendingResults = resetState;

    dispatch({
      type: RESET_SORTING,
      payload
    });
  };
};

/*

export const createInitAppData = giphyResults => {
  const initialState = {};
  const gifIDSet = {};

  // create gifIDSet for Redux store to track gifs already seen
  giphyResults.gifData.forEach(({ id }) => {
    gifIDSet[id] = true;
  });

  initialState.giphyResults = giphyResults;
  initialState.giphyResults.gifIDSet = gifIDSet;

  // Tell Redux store app is currently inTrending Mode
  initialState.appStatus = {
    appStarted: true,
    inTrendingMode: true,
    inSearchMode: false
  };

  return initialState;
};


*/
