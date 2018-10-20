import {
  GET_SEARCH_RESULTS,
  SCROLLING_TRUE,
  SWITCH_TO_SEARCH_MODE
} from "../../actions/types.js";

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

    case SWITCH_TO_SEARCH_MODE:
      return action.payload.giphyResults;

    case SCROLLING_TRUE:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default searchResults;
