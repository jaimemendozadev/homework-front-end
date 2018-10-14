/* eslint prefer-destructuring: "warn", no-unused-vars: "warn" */
import React, { Component } from "react";
import styles from "./sass/_styles.scss";
import GifCard from "./components/GifCard.jsx";
import GifView from "./components/GifView/index.jsx";

const BASE_GIPHY_URL = process.env.BASE_GIPHY_URL;
const API_KEY = process.env.API_KEY;
const defaultState = {
  gifData: [],
  offset: null,
  totalCount: null,
  scrolling: false
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  fetchGifs = async () => {
    const { offset } = this.state;
    const { gifData } = this.state;

    // console.log("offset ", offset);
    const REQ_URL = `${BASE_GIPHY_URL}/trending?api_key=${API_KEY}&offset=${offset}`;

    const giphyResponse = await fetch(REQ_URL)
      .then(response => response.json())
      .catch(error => console.log("error fetching ", error));

    // console.log("giphyReponse ", giphyResponse);

    const { data, pagination } = giphyResponse;
    const { totalCount } = pagination;

    this.setState({
      gifData: [...gifData, ...data],
      totalCount,
      scrolling: false
    });
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        offset: prevState.offset + 25,
        scrolling: true
      }),
      this.fetchGifs
    );
  };

  handleScroll = () => {
    const { scrolling, totalCount, offset } = this.state;

    if (scrolling) return;
    if (offset >= totalCount) return;

    const lastImg = document.querySelector(
      "div.gif-container > img:last-child"
    );
    const lastImgOffset = lastImg.offsetTop + lastImg.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 20;
    if (pageOffset > lastImgOffset - bottomOffset) {
      this.loadMore();
    }
  };

  invokeHandleScroll = event => {
    this.handleScroll(event);
  };

  componentDidMount = async () => {
    const REQ_URL = `${BASE_GIPHY_URL}/trending?api_key=${API_KEY}`;

    const giphyResponse = await fetch(REQ_URL).then(response =>
      response.json()
    );

    const { data, pagination } = giphyResponse;
    const { total_count: totalCount, offset } = pagination;

    window.addEventListener("scroll", this.invokeHandleScroll);

    // console.log("totalCount is ", totalCount);

    this.setState({
      gifData: data,
      totalCount,
      offset
    });
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.invokeHandleScroll);
  };

  render() {
    const { gifData } = this.state;
    return (
      <div>
        <h1>Giphy Sandbox</h1>
        <GifView gifData={gifData} />
      </div>
    );
  }
}

export default App;
