/* no-unused-vars: "warn" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./sass/_styles.scss";
import GifView from "./components/GifView/index.jsx";
import Search from "./components/Search/index.jsx";
import { appLoaded } from "../services/redux/actions/index.js";

import {
  handleScroll,
  updateGifFeed,
  makeGiphyRequest
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
    // get more trending Gifs and setState
    const giphyResult = await updateGifFeed(this.state);

    this.setState(giphyResult);
  };

  loadMore = () => {
    /*
    this.setState(
      prevState => ({
        offset: prevState.offset + 25,
        scrolling: true
      }),
      this.setGifState
    );
    */
  };

  invokeHandleScroll = event => {
    // handleScroll checks window dimensions and if
    // user reaches bottom of page, loadMore() gifs
    const loadMore = handleScroll(this.state);

    if (loadMore === true) {
      this.loadMore();
    }
  };

  componentDidMount = async () => {
    const { appStarted, AppLoaded } = this.props;

    // Add event listener when user scrolls to bottom of page
    window.addEventListener("scroll", this.invokeHandleScroll);

    // On CDM, if app hasn't started, make initialGiphyReq
    if (appStarted === false) {
      const initialState = await makeGiphyRequest();

      // set appStarted flag in Redux store to true
      initialState.appStatus = { appStarted: true, inTrendingMode: true };

      AppLoaded(initialState);
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.invokeHandleScroll);
  };

  render() {
    const { gifData } = this.state;

    console.log("this.props inside App ", this.props);

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
  }).isRequired,
  appStarted: PropTypes.bool.isRequired,
  inSearchMode: PropTypes.bool.isRequired,
  inTrendingMode: PropTypes.bool.isRequired,
  trendingResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool
  }).isRequired
};

const mapStateToProps = ({ appStatus, trendingResults }) => ({
  appStarted: appStatus.appStarted,
  inSearchMode: appStatus.inSearchMode,
  inTrendingMode: appStatus.inTrendingMode,
  trendingResults
});

export default connect(
  mapStateToProps,
  { AppLoaded: appLoaded }
)(App);
