import React from 'react'

function ChannelIcon({channelObj}) {
  return (
    <>
    <div className="channelMaintain">

    <img src={channelObj.image} alt="" className="channelIcon" />
    <p className="">{channelObj.abbreviation}</p>
    
    
    </div>
    
    </>
  )
}

export default ChannelIcon