import React from "react";

function BizSlice({ businessObj }) {
  return (
    <>
      <div className="bizPieceMajor">
        <img src={businessObj.bizIcon} alt="" className="bizImg" />
        <p className="bizNombre">{businessObj.bizName}</p>
      </div>
    </>
  );
}

export default BizSlice;
