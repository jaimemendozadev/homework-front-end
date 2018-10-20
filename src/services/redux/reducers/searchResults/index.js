import { GET_SEARCH_RESULTS } from "../../actions/types.js";

const defaultSearchResultsState = {
  gifData: [],
  offset: null,
  totalCount: null,
  scrolling: false
};

const searchResults = (state = defaultSearchResultsState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return action.payload;

    default:
      return state;
  }
};

export default searchResults;
