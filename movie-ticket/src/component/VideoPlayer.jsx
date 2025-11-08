import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ onClose }) {
  return (
    <div className="video">
      <h2 
        style={{position: "relative", bottom: "200px", left: "1100px", color: "red", cursor: "pointer"}}
        onClick={onClose}
      >
        X
      </h2>
      <ReactPlayer 
        // url="https://www.youtube.com/watch?v=hSBwq8yrXf0"
        url="src/component/video.mp4.mp4"
        playing
        controls
        width="80%"
        height="60%"
      />
    </div>
  );
}




export default VideoPlayer;
