import { GET_SEARCH_RESULTS, SCROLLING_TRUE } from "../../actions/types.js";

const defaultSearchResultsState = {
  gifData: [],
  offset: 0,
  totalCount: null,
  scrolling: false
};

const searchResults = (state = defaultSearchResultsState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return action.payload;

    case SCROLLING_TRUE:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default searchResults;
