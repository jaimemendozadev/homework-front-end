import React, { Component } from "react";
import PropTypes from "prop-types";
import Placeholder from "../../assets/dancing-slack-penguin.gif";



const defaultState = {
  imgURL: Placeholder
};

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount = () => {
    // const gifImage = new Image();
    
    // gifImage.src = 

    // gifImage.onload = () => {
    //   this.setState({
    //     imageURL:   
    //   })
    // }
  }

  render() {
    const { gif, layout } = this.props;
    const { imgURL } = this.state;
    return (
      <div className={`gifcard-container ${layout}`}>
        <img
          alt={`${gif.title} Gif`}
          key={`${gif.id}`}
          //   src={`${gif.images.fixed_height.url}`}
          src={imgURL}
        />
      </div>
    );
  }
}

GifCard.propTypes = {
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

export default GifCard;
