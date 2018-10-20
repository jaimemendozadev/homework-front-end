/* eslint prefer-destructuring: "warn" */
const BASE_GIPHY_URL = process.env.BASE_GIPHY_URL;
const API_KEY = process.env.API_KEY;

const REQ_URL = `${BASE_GIPHY_URL}/trending?api_key=${API_KEY}&offset=`;
const SEARCH_URL = `${BASE_GIPHY_URL}/search?api_key=${API_KEY}&offset=`;

const processGifphyResponse = (giphyResponse, oldState = null) => {
  const { data, pagination } = giphyResponse;
  const { total_count: totalCount, offset } = pagination;

  // this will break the app in CDM?
  if (oldState === null) {
    const newState = {
      giphyResults: {
        gifData: data,
        totalCount,
        offset,
        scrolling: false
      }
    };

    return newState;
  }

  const lastIdx = oldState.length - 1;
  const filteredID = oldState[lastIdx].id;
  const firstGifID = data[0].id;

  // Sanitize old oldState to avoid getting dupe gif data objects
  const sanitized = filteredID === firstGifID ? oldState.pop() : oldState;

  const newState = {
    gifData: [...sanitized, ...data],
    totalCount,
    offset,
    scrolling: false
  };

  return newState;
};

export const handleScroll = ({ scrolling, totalCount, offset }) => {
  if (scrolling) return;
  if (offset >= totalCount) return;

  const lastImg = document.querySelector(
    "div.gifview-container > .gifplaceholder-container:last-child"
  );
  const lastImgOffset = lastImg.offsetTop + lastImg.clientHeight;
  const pageOffset = window.pageYOffset + window.innerHeight;
  const bottomOffset = 20;

  return pageOffset > lastImgOffset - bottomOffset;
};

export const makeGiphyRequest = async (searchValue = null, offset = 0) => {
  const requestURL =
    searchValue === null
      ? `${REQ_URL}${offset}`
      : `${SEARCH_URL}${offset}&q=${searchValue}`;

  const giphyResponse = await fetch(requestURL).then(response =>
    response.json()
  );

  return processGifphyResponse(giphyResponse);
};

// Need to update REQ_URL for searching
export const updateGifFeed = async (
  searchValue = null,
  urlOffset = 0,
  gifData
) => {
  const URL =
    searchValue === null
      ? `${REQ_URL}${urlOffset}`
      : `${SEARCH_URL}${urlOffset}&q=${searchValue}`;
  try {
    const giphyResponse = await fetch(URL).then(response => response.json());

    console.log("giphyResponse inside updateGifFeed ", giphyResponse);

    const { data, pagination } = giphyResponse;
    const { total_count: totalCount, offset } = pagination;

    const lastIdx = gifData.length - 1;
    const filteredID = gifData[lastIdx].id;
    const firstGifID = data[0].id;

    // Sanitize old gifData to avoid getting dupe gif data objects
    const sanitized = filteredID === firstGifID ? gifData.pop() : gifData;

    const newState = {
      gifData: [...sanitized, ...data],
      totalCount,
      offset,
      scrolling: false
    };

    return newState;
  } catch (error) {
    return { isError: true, status: "There was a problem fetching the Gifs." };
  }
};

/*

const REQ_URL = `${BASE_GIPHY_URL}/trending?api_key=${API_KEY}`;
const SEARCH_URL = `${BASE_GIPHY_URL}/search?api_key=${API_KEY}`;


export const makeGiphyRequest = async (searchValue = null) => {
  const requestURL =
    searchValue === null ? REQ_URL : `${SEARCH_URL}&q=${searchValue}`;

  const giphyResponse = await fetch(requestURL).then(response =>
    response.json()
  );

  return processGifphyResponse(giphyResponse);
};



export const updateGifFeed = async (newOffset, gifData) => {
  try {
    const reqURL = `${REQ_URL}&offset=${newOffset}`;

    const giphyResponse = await fetch(reqURL).then(response => response.json());

    console.log("giphyResponse inside updateGifFeed ", giphyResponse);

    const { data, pagination } = giphyResponse;
    const { total_count: totalCount, offset } = pagination;

    const lastIdx = gifData.length - 1;
    const filteredID = gifData[lastIdx].id;
    const firstGifID = data[0].id;

    // Sanitize old gifData to avoid getting dupe gif data objects
    const sanitized = filteredID === firstGifID ? gifData.pop() : gifData;

    const newState = {
      gifData: [...sanitized, ...data],
      totalCount,
      offset,
      scrolling: false
    };

    return newState;
  } catch (error) {
    return { isError: true, status: "There was a problem fetching the Gifs." };
  }
};
*/
