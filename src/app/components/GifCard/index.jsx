import React from "react";
import Logo from "../../assets/dancing-slack-penguin.gif";

const GifCard = props => {
  console.log("props inside GifCard ", props);
  const { gif } = props.location.state;
  const { title, username, images } = gif;

  console.log("gif inside GifCard ", gif);

  return (
    <div className="app-container">
      <div className="gifcard-container">
        <div className="gifstagram-icon">
          <img src={`/${Logo}`} />
        </div>

        <div className="gifcard-gif-container">
          <img src={images.fixed_width.url} />
        </div>

        <div className="gifcard-text-container">
          <h4>
            Title:
            {title.toUpperCase()}
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
