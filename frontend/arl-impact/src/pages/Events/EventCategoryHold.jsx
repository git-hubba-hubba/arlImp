import React from "react";
import SmallEventShow from "./SmallEventShow";

function EventCategoryHold({ contentType, arrObjs, onOpenModal }) {
  
  return (
    <div
      style={{
        // border: " .5px solid black",
        // margin: ".2em",
        // backgroundColor: "lightblue",
      }}
    >
      <div className="eventNavSm">
        <h3 className="topicEvt fontdiner-swanky-regular">{contentType}</h3>
      </div>
      <div className="specificEvent">
        {arrObjs.map((tinyEv, index) => {
          return (
            <div key={tinyEv._id || `${contentType}-${tinyEv.eventName}-${index}`}>
              <SmallEventShow
                topic={contentType}
                eventObj={tinyEv}
                onOpenModal={() => onOpenModal(tinyEv)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventCategoryHold;
