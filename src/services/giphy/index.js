/* eslint prefer-destructuring: "warn" */
const BASE_GIPHY_URL = process.env.BASE_GIPHY_URL;
const API_KEY = process.env.API_KEY;
const REQ_URL = `${BASE_GIPHY_URL}/trending?api_key=${API_KEY}`;
const SEARCH_URL = `${BASE_GIPHY_URL}/search?api_key=${API_KEY}`;

export const makeInitialGiphyRequest = async () => {
  const giphyResponse = await fetch(REQ_URL).then(response => response.json());

  return giphyResponse;
};

export const makeGiphySearchRequest = async searchValue => {
  const giphyResult = await fetch(`${SEARCH_URL}&q=${searchValue}`).then(
    response => response.json()
  );

  return giphyResult;
};

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
  if (pageOffset > lastImgOffset - bottomOffset) {
    return true;
  }
  return false;
};

export const fetchGifs = async ({ offset, gifData }) => {
  // console.log("offset ", offset);
  const reqURL = `${REQ_URL}&offset=${offset}`;

  const giphyResponse = await fetch(reqURL)
    .then(response => response.json())
    .catch(error => console.log("error fetching ", error));

  // console.log("giphyReponse ", giphyResponse);

  const { data, pagination } = giphyResponse;
  const { totalCount } = pagination;

  const newState = {
    gifData: [...gifData, ...data],
    totalCount,
    scrolling: false
  };

  return newState;
};
