export const setLayoutGifSize = (gif, currentLayout) => {
  // gif.images.fixed_height.url
  if (currentLayout === "mobile-layout") {
    return `${gif.images.fixed_height.url}`;
  }

  if (currentLayout === "GifCard") {
    return `${gif.images.original.url}`;
  }

  return "";
};
