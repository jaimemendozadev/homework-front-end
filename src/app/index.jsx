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

class App extends Component {
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

  loadMore = async () => {
    const {
      inTrendingMode,
      trendingResults,
      UpdateTrendingResults
    } = this.props;

    /*
      this.setState(
      prevState => ({
        offset: prevState.offset + 25,
        scrolling: true
      }),
      this.fetchGifs
    );
    */

    if (inTrendingMode === true) {
      const { offset, gifData } = trendingResults;

      const newOffSet = offset + 25;
      const giphyResult = await updateGifFeed(newOffSet, gifData);

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
    const toUpdate = inTrendingMode === true ? trendingResults : searchResults;

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
      const initialState = {};

      const giphyResults = await makeGiphyRequest();

      initialState.giphyResults = giphyResults;
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
