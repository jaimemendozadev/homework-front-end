import React, { Component } from "react";

const BASE_GIPHY_URL = process.env.BASE_GIPHY_URL;
const API_KEY = process.env.API_KEY;
const SEARCH_URL = `${BASE_GIPHY_URL}/search?api_key=${API_KEY}`;

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
    event.preventDefault();
    const {searchValue} = this.state;

    const giphyResult = await fetch(`${SEARCH_URL}&q=${searchValue}`).then(response => response.json());

    console.log('giphyResult is ', giphyResult)

    this.setState(defaultState);

  }

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

export default Search;
