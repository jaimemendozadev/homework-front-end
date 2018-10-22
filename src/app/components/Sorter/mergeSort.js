const stitch = (firstArray, secondArray, direction) => {
  const results = [];
  // import_datetime
  while (firstArray.length && secondArray.length) {
    const firstDate = new Date(firstArray[0].import_datetime);
    const secondDate = new Date(secondArray[0].import_datetime);

    if (direction === "Asc") {
      firstDate < secondDate
        ? results.push(firstArray.shift())
        : results.push(secondArray.shift());
    } else {
      firstDate > secondDate
        ? results.push(firstArray.shift())
        : results.push(secondArray.shift());
    }
  }

  return [...results, ...firstArray, ...secondArray];
};

export const mergeSort = (dataArray, direction) => {
  if (dataArray.length < 2) {
    return dataArray;
  }

  const mid = Math.floor(dataArray.length / 2);

  const firstHalf = dataArray.slice(0, mid);
  const secondHalf = dataArray.slice(mid);

  return stitch(
    mergeSort(firstHalf, direction),
    mergeSort(secondHalf, direction),
    direction
  );
};
