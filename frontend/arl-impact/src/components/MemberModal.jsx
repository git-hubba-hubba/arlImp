import React from "react";

function MemberModal({ member }) {
  const memberName = member.username || member.name;
  const memberImage = member.userImage || member.img;
  const memberOccupation = member.userOccupation || member.position;
  const memberTier = member.userBadgeTier || member.companyName;

  return (
    <div className="modalDetail modalDetailSplit">
      <img src={memberImage} alt={memberName} className="modalDetailImg" />
      <div>
        <p className="modalEyebrow">{memberTier}</p>
        <p>{memberOccupation}</p>
        {member.userEmail && <p>{member.userEmail}</p>}
        {typeof member.userPoints === "number" && <p>{member.userPoints} points</p>}
      </div>
    </div>
  );
}

export default MemberModal;
