/* eslint prefer-destructuring: "warn" */
const BASE_GIPHY_URL = process.env.BASE_GIPHY_URL;
const API_KEY = process.env.API_KEY;
const REQ_URL = `${BASE_GIPHY_URL}/trending?api_key=${API_KEY}`;
const SEARCH_URL = `${BASE_GIPHY_URL}/search?api_key=${API_KEY}`;

export const handleScroll = state => {
  const { scrolling, totalCount, offset } = state;

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

export const makeGiphyRequest = async (searchValue = null) => {
  const requestURL =
    searchValue === null ? REQ_URL : `${SEARCH_URL}&q=${searchValue}`;

  const giphyResponse = await fetch(requestURL).then(response =>
    response.json()
  );

  console.log("giphyResponse is ", giphyResponse);

  const { data, pagination } = giphyResponse;
  const { total_count: totalCount, offset } = pagination;

  const newState = {
    giphyResults: {
      gifData: data,
      totalCount,
      offset
    }
  };

  return newState;
};

// Need to update REQ_URL for searching
export const updateGifFeed = async ({ offset, gifData }) => {
  const reqURL = `${REQ_URL}&offset=${offset}`;

  const giphyResponse = await fetch(reqURL)
    .then(response => response.json())
    .catch(error => console.log("error fetching ", error));

  const { data, pagination } = giphyResponse;
  const { totalCount } = pagination;

  const newState = {
    gifData: [...gifData, ...data],
    totalCount,
    scrolling: false
  };

  return newState;
};
