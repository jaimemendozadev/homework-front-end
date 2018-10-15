import React from "react";
import Logo from "../../assets/dancing-slack-penguin.gif";

const GifCard = props => {
  console.log("props inside GifCard ", props);
  const {
    location: {
      state: { gif }
    }
  } = props;
  const { title, username, images, url } = gif;

  console.log("gif inside GifCard ", gif);

  return (
    <div className="app-container">
      <div className="gifcard-container">
        <div className="gifstagram-icon">
          <div className="logo-container">
            <img src={`/${Logo}`} />
          </div>

          <h2>Gifstagram</h2>
        </div>

        <div className="gifcard-gif-container">
          <img src={images.original.url} />

          {/* <img src={`https://media0.giphy.com/media/xT8qBmPuOVffLrlKVi/giphy.gif`} /> */}
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
};

export default GifCard;
