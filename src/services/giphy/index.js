/* eslint prefer-destructuring: "warn" */
const BASE_GIPHY_URL = process.env.BASE_GIPHY_URL;
const API_KEY = process.env.API_KEY;

const REQ_URL = `${BASE_GIPHY_URL}/trending?api_key=${API_KEY}&offset=`;
const SEARCH_URL = `${BASE_GIPHY_URL}/search?api_key=${API_KEY}&offset=`;

export const handleScroll = ({ scrolling, totalCount, offset }) => {
  if (scrolling) return; // See note below
  if (offset >= totalCount) return;

  const lastImg = document.querySelector(
    "div.gifview-container > .gifplaceholder-container:last-child"
  );
  const lastImgOffset = lastImg.offsetTop + lastImg.clientHeight;
  const pageOffset = window.pageYOffset + window.innerHeight;
  const bottomOffset = 20;

  return pageOffset > lastImgOffset - bottomOffset;
};

export const prepStateForRedux = giphyResponse => {
  const preppedGiphyState = giphyResponse.map(gif => {
    const gifObject = {};

    gifObject.id = gif.id;
    gifObject.url = gif.url;
    gifObject.title = gif.title;
    gifObject.import_datetime = gif.import_datetime;
    gifObject.username = gif.username;
    gifObject.images = {
      fixed_height: gif.images.fixed_height.url,
      fixed_width: gif.images.fixed_width.url,
      original: gif.images.original.url
    };

    return gifObject;
  });

  return preppedGiphyState;
};

const processResponse = giphyResponse => {
  const { data, pagination } = giphyResponse;
  const { total_count: totalCount, offset } = pagination;

  const preppredGifData = prepStateForRedux(data);

  const newState = {
    gifData: preppredGifData,
    totalCount,
    offset,
    scrolling: false
  };

  return newState;
};

// makeInitRequest makes first request for trendingResults & searchResults
export const makeInitRequest = async (searchValue = null, offset = 0) => {
  const requestURL =
    searchValue === null
      ? `${REQ_URL}${offset}`
      : `${SEARCH_URL}${offset}&q=${searchValue}`;

  try {
    const giphyResponse = await fetch(requestURL).then(response =>
      response.json()
    );

    return processResponse(giphyResponse);
  } catch (error) {
    console.log("There was a problem making the intial request. ", error);
  }
};

export const updateGifFeed = async (searchValue = null, urlOffset = 0) => {
  const URL =
    searchValue === null
      ? `${REQ_URL}${urlOffset}`
      : `${SEARCH_URL}${urlOffset}&q=${searchValue}`;

  try {
    const giphyResponse = await fetch(URL).then(response => response.json());

    const { data, pagination } = giphyResponse;
    const { total_count: totalCount, offset } = pagination;

    const preppredGifData = prepStateForRedux(data);

    const newState = {
      gifData: preppredGifData,
      totalCount,
      offset,
      scrolling: false
    };

    return newState;
  } catch (error) {
    console.log("error fetching the gifs ", error);
    return { isError: true, status: "There was a problem fetching the Gifs." };
  }
};

/** ******** 

handleScroll: scrolling boolean

- If user is already at the bottom of the page and request is already in progress to fetch more Gif results, the scrolling flag should be true to prevent another call that makes the same request twice.

********* */
