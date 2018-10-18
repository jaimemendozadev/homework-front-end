/* no-unused-vars: "warn" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./sass/_styles.scss";
import GifView from "./components/GifView/index.jsx";
import Search from "./components/Search/index.jsx";
import {
  handleScroll,
  fetchGifs,
  makeInitialGiphyRequest
} from "../services/giphy/index.js";

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

  setGifState = async () => {
    const giphyResult = await fetchGifs(this.state);

    this.setState(giphyResult);
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        offset: prevState.offset + 25,
        scrolling: true
      }),
      this.setGifState
    );
  };

  invokeHandleScroll = event => {
    const loadMore = handleScroll(this.state);

    if (loadMore === true) {
      this.loadMore();
    }
  };

  componentDidMount = async () => {
    const giphyResponse = await makeInitialGiphyRequest();

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
      <div className="app-container">
        <div className="top-half">
          <h1>Gifstagram</h1>
        </div>

        <Search />

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
