import React from 'react'

function Aqfriend({friendObj}) {
  return (
    <>
      <div className="fcContainer">
        <img src={friendObj.img} alt="" className="fprofImg" />

        <p className="fprofName">{friendObj.name}</p>
      </div>
    </>
  )
}

export default Aqfriend