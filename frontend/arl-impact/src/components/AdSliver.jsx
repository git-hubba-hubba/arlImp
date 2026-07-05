import React from "react";

function AdSliver({adObj}) {
  return (
    <>
      <div className="sliverComp">
        <div className="descSliver">
          <div className="sliverTitle">{adObj.adTittle}</div>

          <p className="sliverDesc">{adObj.adDesc}</p>
        </div>

        <img src={adObj.adImg} alt="" className="sliverIcon" />
      </div>
    </>
  );
}

export default AdSliver;
