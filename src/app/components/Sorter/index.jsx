import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mergeSort, prepMergeSortData } from "./utils.js";

import {
  initiateSorting,
  resetSorting
} from "../../../services/redux/actions/index.js";

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

    const mergeSortState = prepMergeSortData(
      mergeResults,
      direction,
      inTrendingMode
    );

    InitiateSorting(...mergeSortState);
  }
};

const resetSort = callback => {
  callback();
};

const Sorter = ({
  appStatus,
  searchResults,
  trendingResults,
  InitiateSorting,
  ResetSorting,
  sort
}) => {
  const { ascendingSort, descendingSort } = sort;

  const disableReset = !!(ascendingSort === false && descendingSort === false);
  return (
    <div className="sorter-container">
      <button
        type="button"
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
        type="button"
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
      <button
        disabled={disableReset}
        type="button"
        onClick={() => resetSort(ResetSorting)}
      >
        Reset
      </button>
    </div>
  );
};

Sorter.propTypes = {
  InitiateSorting: PropTypes.func.isRequired,
  ResetSorting: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    ascendingSort: PropTypes.bool,
    descendingSort: PropTypes.bool
  }).isRequired,
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
  { InitiateSorting: initiateSorting, ResetSorting: resetSorting }
)(Sorter);
