import React, { Component } from "react";
import PropTypes from "prop-types";
import { setLayoutGifSize } from "../utils";
import Logo from "../../assets/dancing-slack-penguin.gif";

const defaultState = {
  imgURL: "",
  imgClassName: ""
};

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount = () => {
    const {
      location: {
        state: { gif }
      }
    } = this.props;

    // Create New Image
    const fetchedGif = new Image();

    // Get gif Image URL based on layout
    fetchedGif.src = setLayoutGifSize(gif, "GifCard");

    // Change imgURL and styling for fetched Gif
    fetchedGif.onload = () => {
      this.setState({
        imgClassName: "fetched-gif"
      });
    };
  };

  render() {
    const {
      location: {
        state: { gif }
      }
    } = this.props;
    const { title, username, images, url } = gif;
    const { imgClassName } = this.state;

    return (
      <div className="app-container-gif-card">
        <div className="gifcard-container">
          <div className="gifstagram-icon-container">
            <div className="logo-container">
              <img alt="dancing penguin Slack icon" src={`/${Logo}`} />
            </div>

            <h2>Gifstagram</h2>
          </div>
          <div className="gifcard-gif-container">
            <img
              className={`gifcard-image ${imgClassName}`}
              src={images.original}
              alt={`${title} gif from Giphy`}
            />
          </div>
          <div className="gifcard-text-container">
            <h4>
              Title:
              <a href={url} rel="noopener noreferrer" target="_blank">
                {` ${title.toUpperCase()}`}
              </a>
            </h4>
            <h4>
              Gif By:
              <a
                href={`https://giphy.com/${username}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                @{username}
              </a>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

GifCard.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object
  }).isRequired
};

export default GifCard;
