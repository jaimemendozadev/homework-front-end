import { INIT_APP } from "../../actions/types.js";

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

    default:
      return state;
  }
};

export default trendingResults;
