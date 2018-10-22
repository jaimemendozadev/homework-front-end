import React from "react";
import PropTypes from "prop-types";

const handleAscendingSort = (appStatus, searchResults, trendingResults) => {
  const { appStarted, inTrendingMode } = appStatus;

  if (appStarted === true) {
    if (inTrendingMode === true) {
        
    } else {

    }
  }
};

const handleDescendingSort = (appStatus, searchResults, trendingResults) => {};

const Sorter = ({ appStatus, searchResults, trendingResults }) => (
  <div className="sorter-container">
    <button
      onClick={() =>
        handleAscendingSort(appStatus, searchResults, trendingResults)
      }
    >
      Asc. Results
    </button>
    <button
      onClick={() =>
        handleDescendingSort(appStatus, searchResults, trendingResults)
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
