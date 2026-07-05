import React from "react";

function SocialBtn({ btnObj,setCurrentFeed }) {
  return (
    <>
      <div className="wale">
        <img src={btnObj.icon} alt="" className="iconSocial" onClick={()=>{
            setCurrentFeed(btnObj.name)
        }}/>
      </div>
    </>
  );
}

export default SocialBtn;
