import React from "react";
import PropTypes from "prop-types";
import { mergeSort } from "./mergeSort.js";

const handleSort = (appStatus, searchResults, trendingResults, direction) => {
  const { appStarted, inTrendingMode } = appStatus;

  if (appStarted === true) {
    if (inTrendingMode === true) {
      const { gifData } = trendingResults;
      const mergeResults = mergeSort(gifData, direction);

      console.log(
        `mergeResults for trendingMode in ${direction} `,
        mergeResults
      );
    } else {
      const { gifData } = searchResults;
      const mergeResults = mergeSort(gifData, direction);

      console.log(
        `mergeResults for searchMode in ${direction} direction `,
        mergeResults
      );
    }
  }
};

const Sorter = ({ appStatus, searchResults, trendingResults }) => (
  <div className="sorter-container">
    <button
      onClick={() =>
        handleSort(appStatus, searchResults, trendingResults, "Asc")
      }
    >
      Asc. Results
    </button>
    <button
      onClick={() =>
        handleSort(appStatus, searchResults, trendingResults, "Dsc")
      }
    >
      Desc. Results
    </button>
    <button>Reset Sorting</button>
  </div>
);

Sorter.propTypes = {
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

export default Sorter;
