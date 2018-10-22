import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mergeSort } from "../utils.js";
import {
  SORT_TRENDING,
  SORT_SEARCH
} from "../../../services/redux/actions/types.js";
import { initiateSorting } from "../../../services/redux/actions/index.js";

const handleSort = (
  appStatus,
  searchResults,
  trendingResults,
  direction,
  InitiateSorting
) => {
  const { appStarted, inTrendingMode } = appStatus;

  if (appStarted === true) {
    const dataToSort =
      inTrendingMode === true ? trendingResults.gifData : searchResults.gifData;

    const mergeResults = mergeSort(dataToSort, direction);
    const payload = {};

    payload.gifData = { gifData: mergeResults };

    // update the appStatus in Redux with current sort direction
    const updatedAppStatus = {};

    if (direction === "Asc") {
      updatedAppStatus.ascendingSort = true;
      updatedAppStatus.descendingSort = false;
    } else {
      updatedAppStatus.ascendingSort = false;
      updatedAppStatus.descendingSort = true;
    }

    payload.appStatus = updatedAppStatus;

    const actionType =
      inTrendingMode === true ? { type: SORT_TRENDING } : { type: SORT_SEARCH };

    InitiateSorting(actionType, payload);
  }
};

const Sorter = ({
  appStatus,
  searchResults,
  trendingResults,
  InitiateSorting
}) => (
  <div className="sorter-container">
    <button
      onClick={() =>
        handleSort(
          appStatus,
          searchResults,
          trendingResults,
          "Asc",
          InitiateSorting
        )
      }
    >
      Asc. Results
    </button>
    <button
      onClick={() =>
        handleSort(
          appStatus,
          searchResults,
          trendingResults,
          "Dsc",
          InitiateSorting
        )
      }
    >
      Desc. Results
    </button>
    <button>Reset Sorting</button>
  </div>
);

Sorter.propTypes = {
  InitiateSorting: PropTypes.func.isRequired,
  appStatus: PropTypes.shape({
    appStarted: PropTypes.bool,
    inTrendingMode: PropTypes.bool,
    inSearchMode: PropTypes.bool
  }).isRequired,

  searchResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool,
    gifIDSet: PropTypes.object,
    searchValue: PropTypes.string
  }).isRequired,

  trendingResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool,
    gifIDSet: PropTypes.object
  }).isRequired
};

export default connect(
  null,
  { InitiateSorting: initiateSorting }
)(Sorter);
