import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Placeholder from "../../assets/dancing-slack-penguin.gif";
import { setLayoutGifSize, renderDate } from "./utils.js";

const defaultState = {
  imgURL: Placeholder,
  imgClassName: "gif-placeholder",
  controller: null
};

const DateDisplay = ({ timestamp }) => (
  <div>
    <h6>{renderDate(timestamp)}</h6>
  </div>
);

class GifPlaceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleDateDisplay = () => {
    const { gif, ascendingSort, descendingSort } = this.props;
    const { imgClassName } = this.state;

    if (ascendingSort || descendingSort) {
      if (imgClassName === "fetched-gif") {
        return <DateDisplay timestamp={gif.import_datetime} />;
      }
    }

    return null;
  };

  componentDidMount = async () => {
    const { gif, layout } = this.props;

    // Get gif Image URL based on layout
    const imgReqURL = setLayoutGifSize(gif, layout);

    // Fetch the Image
    const imageBlob = await fetch(imgReqURL).then(response => response.blob());

    const imgURL = URL.createObjectURL(imageBlob);

    this.setState({
      imgURL,
      imgClassName: "fetched-gif"
    });
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
        {this.handleDateDisplay()}
      </div>
    );
  }
}

DateDisplay.propTypes = {
  timestamp: PropTypes.string.isRequired
};

GifPlaceHolder.propTypes = {
  ascendingSort: PropTypes.bool.isRequired,
  descendingSort: PropTypes.bool.isRequired,
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

const mapStateToProps = ({ appStatus }) => ({
  ascendingSort: appStatus.ascendingSort,
  descendingSort: appStatus.descendingSort
});

export default connect(mapStateToProps)(GifPlaceHolder);
