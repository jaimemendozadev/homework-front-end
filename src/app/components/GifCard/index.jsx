/* eslint-disable react/no-unused-prop-types */
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
        imgURL: fetchedGif.src,
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
    const { imgClassName, imgURL } = this.state;

    console.log("gif inside GifCard ", gif);

    return (
      <div className="app-container">
        <div className="gifcard-container">
          <div className="gifstagram-icon-container">
            <div className="logo-container">
              <img src={`/${Logo}`} />
            </div>

            <h2>Gifstagram</h2>
          </div>

          <div className="gifcard-gif-container">
            <img
              className={`gifcard-image ${imgClassName}`}
              src={images.original.url}
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

GifCard.defaultProps = {
  hash: "",
  key: "",
  pathname: "",
  search: "",
  state: {}
};

GifCard.propTypes = {
  hash: PropTypes.string,
  key: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  state: PropTypes.shape({
    bitly_gif_url: PropTypes.string,
    bitly_url: PropTypes.string,
    content_url: PropTypes.string,
    embed_url: PropTypes.string,
    id: PropTypes.string,
    images: PropTypes.object,
    import_datetime: PropTypes.string,
    is_sticker: PropTypes.number,
    rating: PropTypes.string,
    slug: PropTypes.string,
    source: PropTypes.string,
    source_post_url: PropTypes.string,
    source_tld: PropTypes.string,
    title: PropTypes.string,
    trending_datetime: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.object,
    username: PropTypes.string
  })
};

export default GifCard;
