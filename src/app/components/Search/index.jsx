import React, { Component } from "react";
import { connect } from "react-redux";
import { makeGiphyRequest } from "../../../services/giphy/index.js";
import { getGiphySearchResults } from "../../../services/redux/actions/index.js";

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
    const { GetGiphySearchResults } = this.props;

    event.preventDefault();
    const { searchValue } = this.state;

    const giphyResult = await makeGiphyRequest(searchValue);

    // Reset the Form input and pass giphyResult to Redux store
    this.setState(defaultState, () => GetGiphySearchResults(giphyResult));
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

export default connect(
  null,
  { GetGiphySearchResults: getGiphySearchResults }
)(Search);