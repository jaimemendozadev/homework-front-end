/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

export const setLayoutGifSize = (gif, currentLayout) => {
  // gif.images.fixed_height.url
  if (currentLayout === "mobile-layout") {
    return `${gif.images.fixed_height}`;
  }

  if (currentLayout === "tablet-layout") {
    return `${gif.images.fixed_width}`;
  }

  if (currentLayout === "desktop-layout") {
    return `${gif.images.original}`;
  }

  if (currentLayout === "GifCard") {
    return `${gif.images.original}`;
  }

  return "";
};

export const getWindowDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return { width, height };
};

export const setCurrentLayout = width => {
  let currentLayout;

  if (width >= 1025) {
    currentLayout = "desktop-layout";
  }

  if (width >= 481 && width <= 1024) {
    currentLayout = "tablet-layout";
  }

  if (width <= 480) {
    currentLayout = "mobile-layout";
  }

  return currentLayout;
};

const stitch = (firstArray, secondArray, direction) => {
  const results = [];

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
  if (dataArray.length === 1) {
    return dataArray[0] === undefined ? [] : dataArray;
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
