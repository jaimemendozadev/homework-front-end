import React from "react";

const renderGifs = gifData =>
  gifData.map(gif => (
    <img key={`${gif.id}`} src={`${gif.images.fixed_height.url}`} />
  ));

const GifView = ({ gifData }) => (
  <div className="gif-container">
    {gifData.length === 0 ? null : renderGifs(gifData)}
  </div>
);

export default GifView;
