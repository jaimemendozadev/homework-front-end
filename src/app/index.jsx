/* no-unused-vars: "warn" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./sass/_styles.scss";
import GifView from "./components/GifView/index.jsx";
import Search from "./components/Search/index.jsx";
import {
  appLoaded,
  loadMoreTrendingData
} from "../services/redux/actions/index.js";

import { handleScroll, makeInitGiphyReq } from "../services/giphy/index.js";

class App extends Component {
  handleGifView = () => {
    const {
      appStarted,
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

  invokeHandleScroll = () => {
    const {
      trendingResults,
      searchResults,
      inTrendingMode,
      inSearchMode,
      LoadMoreTrendingData
    } = this.props;
    const toUpdate = inTrendingMode === true ? trendingResults : searchResults;

    // Check to see if user is at bottom of the browswer
    const loadMore = handleScroll(toUpdate);

    if (loadMore === true) {
      if (inTrendingMode === true) {
        // Fire action that updates scrolling and fetches more data
        LoadMoreTrendingData(trendingResults);
      }

      if (inSearchMode === true) {
        // do something
      }
    }
  };

  componentDidMount = async () => {
    const { appStarted, AppLoaded } = this.props;

    // Add event listener when user scrolls to bottom of page
    window.addEventListener("scroll", this.invokeHandleScroll);

    // On CDM, if app hasn't started, make initialGiphyReq
    if (appStarted === false) {
      const initialState = {};
      const gifIDSet = {};

      const giphyResults = await makeInitGiphyReq(null, 0);

      // create gifIDSet for Redux store to track gifs already seen
      giphyResults.gifData.forEach(({ id }) => (gifIDSet[id] = true));

      // Tell Redux store app is currently inTrending Mode
      initialState.giphyResults = giphyResults;
      initialState.giphyResults.gifIDSet = gifIDSet;

      initialState.appStatus = {
        appStarted: true,
        inTrendingMode: true,
        inSearchMode: false
      };

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
  LoadMoreTrendingData: PropTypes.func.isRequired,

  trendingResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool,
    import_datetime: PropTypes.string,
    gifIDSet: PropTypes.object
  }).isRequired,

  searchResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool,
    import_datetime: PropTypes.string,
    gifIDSet: PropTypes.object
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
  {
    AppLoaded: appLoaded,
    LoadMoreTrendingData: loadMoreTrendingData
  }
)(App);
