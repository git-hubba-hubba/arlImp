import { React, useState } from "react";

function Channel({ stationName }) {
  return (
    <>
      <div className="flexer">
      <div className="channelMain">{stationName}</div>
        <img
          src="https://images.vexels.com/media/users/3/204813/isolated/preview/3c2054eb83e39c62c77f1a2f521ba8b1-hashtag-symbol-stroke.png"
          alt=""
          className="smIcon"
        />
        
      </div>
     
    </>
  );
}

export default Channel;
