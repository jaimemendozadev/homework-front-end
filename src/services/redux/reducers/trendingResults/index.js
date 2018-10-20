import {
  INIT_APP,
  UPDATE_TRENDING_RESULTS,
  SCROLLING_TRUE
} from "../../actions/types.js";

const defaultTrendingResultsState = {
  gifData: [],
  offset: 0,
  totalCount: null,
  scrolling: false
};

const trendingResults = (state = defaultTrendingResultsState, action) => {
  switch (action.type) {
    case INIT_APP:
      return Object.assign({}, state, action.payload.giphyResults);

    case SCROLLING_TRUE:
      return Object.assign({}, state, action.payload);

    case UPDATE_TRENDING_RESULTS:
      return action.payload;

    default:
      return state;
  }
};

export default trendingResults;
