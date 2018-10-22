/* no-unused-vars: "warn" */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./sass/_styles.scss";
import GifView from "./components/GifView/index.jsx";
import Search from "./components/Search/index.jsx";
import Sorter from "./components/Sorter/index.jsx";
import { appLoaded, loadMoreData } from "../services/redux/actions/index.js";
import {
  UPDATE_TRENDING_RESULTS,
  UPDATE_SEARCH_RESULTS,
  SEARCH_SCROLLING_TRUE,
  TRENDING_SCROLLING_TRUE
} from "../services/redux/actions/types.js";
import { handleScroll, makeInitRequest } from "../services/giphy/index.js";

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
      LoadMoreData,
      ascendingSort,
      descendingSort
    } = this.props;

    const toUpdate = inTrendingMode === true ? trendingResults : searchResults;

    // determine if gifData needs to be sorted
    let sortDirection;

    if (ascendingSort || descendingSort) {
      if (ascendingSort === true && descendingSort === false) {
        sortDirection = "Asc";
      } else if (ascendingSort === false && descendingSort === true) {
        sortDirection = "Dsc";
      } else {
        sortDirection = null;
      }
    }

    // Check to see if user is at bottom of the browswer
    const loadMore = handleScroll(toUpdate);

    if (loadMore === true) {
      if (inTrendingMode === true) {
        const { offset, gifData, gifIDSet } = trendingResults;
        const newOffSet = offset + 25;

        const action = {
          scroll: TRENDING_SCROLLING_TRUE,
          type: UPDATE_TRENDING_RESULTS
        };

        // Fire action that updates scrolling and fetches more data
        LoadMoreData(null, newOffSet, gifData, gifIDSet, action, sortDirection);
      } else {
        const { offset, gifData, gifIDSet, searchValue } = searchResults;
        const newOffSet = offset + 25;

        const action = {
          scroll: SEARCH_SCROLLING_TRUE,
          type: UPDATE_SEARCH_RESULTS
        };

        LoadMoreData(
          searchValue,
          newOffSet,
          gifData,
          gifIDSet,
          action,
          sortDirection
        );
      }
    }
  };

  componentDidMount = async () => {
    const { appStarted, AppLoaded } = this.props;

    // Add event listener when user scrolls to bottom of page
    window.addEventListener("scroll", this.invokeHandleScroll);

    // On CDM, if app hasn't started, make initRequest for data
    if (appStarted === false) {
      const initialState = {};
      const gifIDSet = {};

      const giphyResults = await makeInitRequest(null, 0);

      // create gifIDSet for Redux store to track gifs already seen
      giphyResults.gifData.forEach(({ id }) => (gifIDSet[id] = true));

      initialState.giphyResults = giphyResults;
      initialState.giphyResults.gifIDSet = gifIDSet;

      // Tell Redux store app is currently inTrending Mode
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
    const {
      trendingResults,
      searchResults,
      appStarted,
      inTrendingMode,
      inSearchMode
    } = this.props;

    return (
      <div className="app-container">
        <div className="top-half">
          <h1>Gifstagram</h1>
        </div>

        <Search />
        <Sorter
          appStatus={{ appStarted, inTrendingMode, inSearchMode }}
          searchResults={searchResults}
          trendingResults={trendingResults}
        />

        {this.handleGifView()}
      </div>
    );
  }
}

App.propTypes = {
  appStarted: PropTypes.bool.isRequired,
  inSearchMode: PropTypes.bool.isRequired,
  inTrendingMode: PropTypes.bool.isRequired,
  ascendingSort: PropTypes.bool.isRequired,
  descendingSort: PropTypes.bool.isRequired,
  AppLoaded: PropTypes.func.isRequired,
  LoadMoreData: PropTypes.func.isRequired,

  trendingResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool,
    gifIDSet: PropTypes.object
  }).isRequired,

  searchResults: PropTypes.shape({
    gifData: PropTypes.array,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    scrolling: PropTypes.bool,
    gifIDSet: PropTypes.object,
    searchValue: PropTypes.string
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
  descendingSort: appStatus.descendingSort,
  ascendingSort: appStatus.ascendingSort,
  trendingResults,
  searchResults
});

export default connect(
  mapStateToProps,
  {
    AppLoaded: appLoaded,
    LoadMoreData: loadMoreData
  }
)(App);
