export const getWindowDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return { width, height };
};

export const setCurrentLayout = width => {
  let currentLayout;

  if (width > 1200) {
    currentLayout = "desktop-layout";
  }

  if (width > 480 && width <= 1200) {
    currentLayout = "tablet-layout";
  }

  if (width <= 480) {
    currentLayout = "mobile-layout";
  }

  return currentLayout;
};
