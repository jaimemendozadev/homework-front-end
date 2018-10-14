import React from "react";
import PropTypes from "prop-types";

const GifCard = ({ gif }) => (
  <div className="gifcard-container">
    <img
      alt={`${gif.title} Gif`}
      key={`${gif.id}`}
      src={`${gif.images.fixed_height.url}`}
    />
  </div>
);

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
  }).isRequired
};

export default GifCard;
