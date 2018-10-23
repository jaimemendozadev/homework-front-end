import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./sass/_styles.scss"; // eslint-disable-line no-unused-vars
import GifView from "./components/GifView/index.jsx";
import Search from "./components/Search/index.jsx";
import Sorter from "./components/Sorter/index.jsx";
import { appLoaded, loadMoreData } from "../services/redux/actions/index.js";
import { handleScroll, makeInitRequest } from "../services/giphy/index.js";
import {
  setSortDirection,
  setLoadMoreDataArgs,
  createInitAppData
} from "./utils.js";

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
    return "";
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

    // Check to see if user is at bottom of the browswer
    const loadMore = handleScroll(toUpdate);

    // determine if gifData needs to be sorted
    const sortDirection = setSortDirection(ascendingSort, descendingSort);

    if (loadMore === true) {
      const loadMoreArgs =
        inTrendingMode === true
          ? setLoadMoreDataArgs(trendingResults, null, sortDirection)
          : setLoadMoreDataArgs(null, searchResults, sortDirection);

      // Call Redux action
      LoadMoreData(...loadMoreArgs);
    }
  };

  componentDidMount = async () => {
    const { appStarted, AppLoaded } = this.props;

    // Add event listener when user scrolls to bottom of page
    window.addEventListener("scroll", this.invokeHandleScroll);

    // On CDM, if app hasn't started, make initRequest for data
    if (appStarted === false) {
      const giphyResults = await makeInitRequest(null, 0);

      const initialState = createInitAppData(giphyResults);

      AppLoaded(initialState);
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.invokeHandleScroll);
  };

  render() {
    const {
      trendingResults,
      searchResults,
      appStarted,
      inTrendingMode,
      inSearchMode,
      ascendingSort,
      descendingSort
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
          sort={{ ascendingSort, descendingSort }}
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
