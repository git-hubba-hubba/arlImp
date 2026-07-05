const Member = require("../models/Member");

function userToMemberPayload(user) {
  return {
    user: user._id,
    username: user.username,
    userEmail: user.userEmail,
    userImage: user.userImage,
    userPoints: user.userPoints,
    userOccupation: user.userOccupation,
    userBadgeTier: user.userBadgeTier,
  };
}

async function upsertMemberFromUser(user) {
  return Member.findOneAndUpdate(
    { user: user._id },
    userToMemberPayload(user),
    { new: true, upsert: true, runValidators: true }
  );
}

module.exports = {
  upsertMemberFromUser,
  userToMemberPayload,
};
