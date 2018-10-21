import React, { Component } from "react";
import PropTypes from "prop-types";
import GifPlaceHolder from "../GifPlaceHolder/index.jsx";
import { getWindowDimensions, setCurrentLayout } from "../utils";

const defaultState = {
  width: 0,
  height: 0,
  currentLayout: "desktop-layout"
};

class GifView extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  renderGifs = (gifData, layout) =>
    gifData.map(
      gif =>
        !gif ? (
          ""
        ) : (
          <GifPlaceHolder key={`${gif.id}`} layout={layout} gif={gif} />
        )
    );

  updateWindowDimensions = () => {
    const { width, height } = getWindowDimensions();

    const currentLayout = setCurrentLayout(width);

    const newState = { width, height, currentLayout };

    this.setState(newState);
  };

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
  };

  render() {
    const { gifData } = this.props;
    const { currentLayout } = this.state;

    return (
      <div className={`gifview-container ${currentLayout}`}>
        {gifData.length === 0 ? null : this.renderGifs(gifData, currentLayout)}
      </div>
    );
  }
}

GifView.propTypes = {
  gifData: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired
};

export default GifView;
