import {
  GET_SEARCH_RESULTS,
  SEARCH_SCROLLING_TRUE,
  SWITCH_TO_SEARCH_MODE,
  SWITCH_TO_TRENDING_MODE,
  UPDATE_SEARCH_RESULTS,
  SORT_SEARCH
} from "../../actions/types.js";

const defaultSearchResultsState = {
  gifData: [],
  offset: 0,
  totalCount: null,
  scrolling: false,
  gifIDSet: {},
  searchValue: ""
};

const searchResults = (state = defaultSearchResultsState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return action.payload;

    case SEARCH_SCROLLING_TRUE:
      return Object.assign({}, state, action.payload);

    case UPDATE_SEARCH_RESULTS:
      return action.payload;

    case SWITCH_TO_SEARCH_MODE:
      return action.payload.giphyResults;

    case SWITCH_TO_TRENDING_MODE:
      return defaultSearchResultsState;

    case SORT_SEARCH:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default searchResults;
