import { INIT_APP, UPDATE_TRENDING_RESULTS } from "../../actions/types.js";

const defaultTrendingResultsState = {
  gifData: [],
  offset: null,
  totalCount: null,
  scrolling: false
};

const trendingResults = (state = defaultTrendingResultsState, action) => {
  switch (action.type) {
    case INIT_APP:
      return Object.assign({}, state, action.payload.giphyResults);

    case UPDATE_TRENDING_RESULTS:
      return action.payload;

    default:
      return state;
  }
};

export default trendingResults;
