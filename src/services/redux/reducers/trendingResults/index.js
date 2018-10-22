import {
  INIT_APP,
  UPDATE_TRENDING_RESULTS,
  TRENDING_SCROLLING_TRUE,
  SWITCH_TO_SEARCH_MODE,
  SORT_TRENDING
} from "../../actions/types.js";

const defaultTrendingResultsState = {
  gifData: [],
  offset: 0,
  totalCount: null,
  scrolling: false,
  gifIDSet: {}
};

const trendingResults = (state = defaultTrendingResultsState, action) => {
  switch (action.type) {
    case INIT_APP:
      return Object.assign({}, state, action.payload.giphyResults);

    case TRENDING_SCROLLING_TRUE:
      return Object.assign({}, state, action.payload);

    case UPDATE_TRENDING_RESULTS:
      return action.payload;

    case SWITCH_TO_SEARCH_MODE:
      return defaultTrendingResultsState;

    case SORT_TRENDING:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default trendingResults;
