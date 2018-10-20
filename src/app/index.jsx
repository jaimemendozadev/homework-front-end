/* no-unused-vars: "warn" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./sass/_styles.scss";
import GifView from "./components/GifView/index.jsx";
import Search from "./components/Search/index.jsx";
import {
  appLoaded,
  updateTrendingResults
} from "../services/redux/actions/index.js";

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

  handleGifView = () => {
    const {
      appStarted,
      inSearchMode,
      inTrendingMode,
      trendingResults,
      searchResults
    } = this.props;

    if (appStarted === true) {
      const gifData =
        inTrendingMode === true
          ? trendingResults.gifData
          : searchResults.gifData;
      return <GifView gifData={gifData} />;
    }
    return <h1>Loading data ...</h1>;
  };

  setGifState = async currentState => {
    // get more trending Gifs and setState
    const giphyResult = await updateGifFeed(currentState);

    this.setState(giphyResult);
  };

  loadMore = async () => {
    const {
      inTrendingMode,
      trendingResults: { offset, gifData },
      UpdateTrendingResults
    } = this.props;
    /*
    this.setState(
      prevState => ({
        offset: prevState.offset + 25,
        scrolling: true
      }),
      this.setGifState
    );
    */

    if (inTrendingMode === true) {
      const giphyResult = await updateGifFeed(offset, gifData);

      UpdateTrendingResults(giphyResult);
    }
  };

  invokeHandleScroll = () => {
    const {
      trendingResults,
      searchResults,
      inTrendingMode,
      inSearchMode
    } = this.props;

    // handleScroll checks window dimensions and if
    // user reaches bottom of page, loadMore() gifs

    const toUpdate = inTrendingMode === true ? trendingResults : searchResults;

    console.log("toUpdate is ", toUpdate);

    const loadMore = handleScroll(toUpdate);

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
    console.log("this.props inside App ", this.props);

    return (
      <div className="app-container">
        <div className="top-half">
          <h1>Gifstagram</h1>
        </div>

        <Search />

        {this.handleGifView()}
      </div>
    );
  }
}

App.propTypes = {
  appStarted: PropTypes.bool.isRequired,
  inSearchMode: PropTypes.bool.isRequired,
  inTrendingMode: PropTypes.bool.isRequired,

  AppLoaded: PropTypes.func.isRequired,
  UpdateTrendingResults: PropTypes.func.isRequired,

  trendingResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool
  }).isRequired,

  searchResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number
  }).isRequired,

  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object
  }).isRequired
};

const mapStateToProps = ({ appStatus, trendingResults, searchResults }) => ({
  appStarted: appStatus.appStarted,
  inSearchMode: appStatus.inSearchMode,
  inTrendingMode: appStatus.inTrendingMode,
  trendingResults,
  searchResults
});

export default connect(
  mapStateToProps,
  { AppLoaded: appLoaded, UpdateTrendingResults: updateTrendingResults }
)(App);
