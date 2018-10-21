// Possible className layouts: mobile-layout, tablet-layout, desktop-layout

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
