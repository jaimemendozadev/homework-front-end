import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Placeholder from "../../assets/dancing-slack-penguin.gif";
import { setLayoutGifSize } from "../utils";

const defaultState = {
  imgURL: Placeholder,
  imgClassName: "gif-placeholder"
};

console.log("PlaceHolder is ", Placeholder);

class GifPlaceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount = () => {
    const { gif, layout } = this.props;

    // Create New Image
    const fetchedGif = new Image();

    // Get gif Image URL based on layout
    fetchedGif.src = setLayoutGifSize(gif, layout);

    // Change imgURL and styling for fetched Gif
    fetchedGif.onload = () => {
      this.setState({
        imgURL: fetchedGif.src,
        imgClassName: "fetched-gif"
      });
    };
  };

  render() {
    const { gif, layout } = this.props;
    const { imgURL, imgClassName } = this.state;

    // Possible className layouts: mobile-layout, tablet-layout, desktop-layout
    // Possible img classNames: gif-placeholder, fetched-gif
    return (
      <div className={`gifplaceholder-container ${layout}`}>
        <Link to={{ pathname: `/gif/${gif.id}`, state: { gif } }}>
          <img
            className={imgClassName}
            alt={`${gif.title} Gif`}
            key={`${gif.id}`}
            src={imgURL}
          />
        </Link>
      </div>
    );
  }
}

GifPlaceHolder.propTypes = {
  gif: PropTypes.shape({
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
  }).isRequired,
  layout: PropTypes.string.isRequired
};

export default GifPlaceHolder;
