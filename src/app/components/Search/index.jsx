import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeInitRequest } from "../../../services/giphy/index.js";
import { switchToSearchMode } from "../../../services/redux/actions/index.js";

const defaultState = {
  searchValue: "Search"
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleChange = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  handleOnEvent = onEvent => {
    const { searchValue } = this.state;
    const searchValueLength = searchValue.length;

    if (onEvent === "onClick") {
      if (searchValue === defaultState.searchValue || searchValueLength > 0) {
        this.setState({ searchValue: "" });
      }
    }

    if (onEvent === "onBlur") {
      if (searchValueLength === 0) {
        this.setState(defaultState);
      }
    }
  };

  checkInput = () => {
    const { searchValue } = this.state;
    const searchValueLength = searchValue.length;

    if (searchValue === defaultState.searchValue || searchValueLength > 0) {
      this.setState({ searchValue: "" });
    }
  };

  handleSubmit = async event => {
    const { SwitchToSearchMode } = this.props;
    const searchState = {};
    const gifIDSet = {};

    event.preventDefault();
    const { searchValue } = this.state;

    const giphyResults = await makeInitRequest(searchValue, 0);

    // create gifIDSet for Redux store to track gifs already seen
    giphyResults.gifData.forEach(({ id }) => {
      gifIDSet[id] = true;
    });

    searchState.giphyResults = giphyResults;
    searchState.giphyResults.gifIDSet = gifIDSet;

    // Save searchValue for Redux store and infinite scroll requests
    searchState.giphyResults.searchValue = searchValue;

    // Tell Redux app is now inSearchMode and pass searchState to store
    searchState.appStatus = { inSearchMode: true, inTrendingMode: false };

    this.setState(defaultState, () => SwitchToSearchMode(searchState));
  };

  render() {
    const { searchValue } = this.state;
    return (
      <div className="search-container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={searchValue}
            onClick={() => this.handleOnEvent("onClick")}
            onBlur={() => this.handleOnEvent("onBlur")}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  SwitchToSearchMode: PropTypes.func.isRequired
};

export default connect(
  null,
  { SwitchToSearchMode: switchToSearchMode }
)(Search);
