/* eslint prefer-destructuring: "warn", no-unused-vars: "warn" */
import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./sass/_styles.scss";
import GifView from "./components/GifView/index.jsx";
import GifCard from "./components/GifCard/index.jsx";

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
      "div.gif-container > .gifcard-container:last-child"
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
    const {
      location: { pathname }
    } = this.props;
    console.log("this.props inside Main App ", this.props);
    console.log("pathname is ", pathname);

    if (pathname.match(/\/gif/gi)) {
      return <Route path="/gif/:id" component={GifCard} />;
    }

    return (
      <div className="app-container">
        <h1>Giphy Sandbox</h1>
        <GifView gifData={gifData} />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object
  }).isRequired
};

export default App;
