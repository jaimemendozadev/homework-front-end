import { mergeSort } from "../utils.js";

import {
  SORT_TRENDING,
  SORT_SEARCH
} from "../../../services/redux/actions/types.js";

const prepMergeSortData = (mergeResults, direction, inTrendingMode) => {
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

  return [actionType, payload];
};

export { mergeSort, prepMergeSortData };
