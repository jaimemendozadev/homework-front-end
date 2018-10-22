import {
  UPDATE_TRENDING_RESULTS,
  UPDATE_SEARCH_RESULTS,
  SEARCH_SCROLLING_TRUE,
  TRENDING_SCROLLING_TRUE
} from "../services/redux/actions/types.js";

export const setSortDirection = (ascendingSort, descendingSort) => {
  let sortDirection;

  if (ascendingSort || descendingSort) {
    if (ascendingSort === true && descendingSort === false) {
      sortDirection = "Asc";
    } else if (ascendingSort === false && descendingSort === true) {
      sortDirection = "Dsc";
    } else {
      sortDirection = null;
    }
  }

  return sortDirection;
};

export const setLoadMoreDataArgs = (
  trendingResults = null,
  searchResults = null,
  sortDirection
) => {
  if (trendingResults != null) {
    const { offset, gifData, gifIDSet } = trendingResults;
    const newOffSet = offset + 25;

    const action = {
      scroll: TRENDING_SCROLLING_TRUE,
      type: UPDATE_TRENDING_RESULTS
    };

    return [null, newOffSet, gifData, gifIDSet, action, sortDirection];
  }
  const { offset, gifData, gifIDSet, searchValue } = searchResults;
  const newOffSet = offset + 25;

  const action = {
    scroll: SEARCH_SCROLLING_TRUE,
    type: UPDATE_SEARCH_RESULTS
  };

  return [searchValue, newOffSet, gifData, gifIDSet, action, sortDirection];
};

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
