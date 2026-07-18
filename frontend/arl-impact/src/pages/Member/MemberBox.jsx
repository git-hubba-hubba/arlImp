import React from 'react'
import { isVideoMedia } from '../../utils/media';
function MemberBox({memObj, onOpenModal}) {
  const memberName = memObj.username || memObj.name;
  const memberImage = memObj.userImage || memObj.img;
  const memberOccupation = memObj.userOccupation || memObj.position;
  const memberTier = memObj.userBadgeTier || memObj.companyName;
   
  return (
    <>
        <div className="boxMem" onClick={onOpenModal}>
            <p className="namer fontdiner-swanky-regular">{memberName}</p>
           <div className="bmLeft">
            {isVideoMedia(memberImage) ? (
              <video src={memberImage} className="boxImg" muted />
            ) : (
              <img src={memberImage} alt="" className="boxImg" />
            )}
            </div> 
            <p>{memberTier}</p>
            <p className="namer fontdiner-swanky-regular">{memberOccupation}</p>

        </div>
    
    </>
  )
}

export default MemberBox
