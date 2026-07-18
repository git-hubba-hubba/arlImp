import { useState } from "react";
import { saveDirectMessage } from "../utils/directMessages";
import { isVideoMedia } from "../utils/media";

const DEFAULT_MEMBER_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80";

function getBadgeProgress(points) {
  if (points >= 1000) return 100;
  if (points >= 500) return 74;
  if (points >= 250) return 48;
  if (points > 0) return 24;

  return 8;
}

function MemberModal({ currentUser, member, onNotify }) {
  const [directMessage, setDirectMessage] = useState("");
  const [isMessagePanelOpen, setIsMessagePanelOpen] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");
  const memberName = member.username || member.name || "Community Member";
  const memberImage = member.userImage || member.img || DEFAULT_MEMBER_IMAGE;
  const memberOccupation = member.userOccupation || member.position || "Community Builder";
  const memberTier = member.userBadgeTier || member.companyName || "Member";
  const memberPoints = Number(member.userPoints) || 0;
  const attendedEvents = member.attendedEvents || [];
  const badgeProgress = getBadgeProgress(memberPoints);
  const impactLabel = memberPoints > 0 ? "Active contributor" : "New connection";

  const handleDirectMessageSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = directMessage.trim();

    if (!trimmedMessage) {
      setMessageStatus("Write a message before sending.");
      return;
    }

    try {
      saveDirectMessage({
        message: trimmedMessage,
        recipient: member,
        sender: currentUser,
      });
      setDirectMessage("");
      setMessageStatus(`Message queued for ${memberName}.`);
      onNotify?.("direct message", `Message sent to ${memberName}.`);
    } catch (error) {
      setMessageStatus(error.message);
    }
  };

  return (
    <div className="memberModalTemplate">
      <section className="memberModalHero">
        {isVideoMedia(memberImage) ? (
          <video src={memberImage} className="memberModalImage" controls />
        ) : (
          <img src={memberImage} alt={memberName} className="memberModalImage" />
        )}
        <div className="memberModalHeroCopy">
          <p className="memberModalEyebrow">{impactLabel}</p>
          <h2 className="memberModalName fontdiner-swanky-regular">{memberName}</h2>
          <p className="memberModalRole">{memberOccupation}</p>
          {member.userEmail && <p className="memberModalContact">{member.userEmail}</p>}
        </div>
      </section>

      <section className="memberModalStats">
        <div className="memberStatCard">
          <span>Points</span>
          <strong>{memberPoints}</strong>
        </div>
        <div className="memberStatCard">
          <span>Badge</span>
          <strong>{memberTier}</strong>
        </div>
        <div className="memberStatCard">
          <span>Events</span>
          <strong>{attendedEvents.length}</strong>
        </div>
      </section>

      <section className="memberBadgePanel">
        <div className="memberBadgeHeader">
          <span className="memberBadgeSeal fontdiner-swanky-regular">{memberTier.charAt(0)}</span>
          <div>
            <p className="memberModalEyebrow">Impact Badge</p>
            <h3>{memberTier}</h3>
          </div>
        </div>
        <div className="memberProgressTrack">
          <div className="memberProgressFill" style={{ width: `${badgeProgress}%` }} />
        </div>
      </section>

      <section className="memberMessagePanel">
        <button
          className="memberMessageToggle"
          type="button"
          onClick={() => setIsMessagePanelOpen((isOpen) => !isOpen)}
        >
          <span>
            <span className="memberModalEyebrow">Private Note</span>
            <strong className="fontdiner-swanky-regular">Message {memberName}</strong>
          </span>
          <span className="memberMessageToggleIcon">{isMessagePanelOpen ? "−" : "+"}</span>
        </button>
        {isMessagePanelOpen && (
          <div className="memberMessageDrawer">
            <p className="memberMessagePrompt">
              Send a direct message that will appear in {memberName}'s notifications the next time they log in.
            </p>
            <form className="memberMessageForm" onSubmit={handleDirectMessageSubmit}>
              <textarea
                className="frmSU memberMessageTextarea"
                value={directMessage}
                maxLength={280}
                onChange={(e) => setDirectMessage(e.target.value)}
                placeholder={`Write something thoughtful for ${memberName}`}
              />
              <div className="memberMessageActions">
                <span>{directMessage.length}/280</span>
                <button className="signUp profileAction" type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        )}
        {messageStatus && <p className="formStatus">{messageStatus}</p>}
      </section>

      <section className="memberActivityPanel">
        <h3 className="fontdiner-swanky-regular">Recent Impact</h3>
        {attendedEvents.length > 0 ? (
          attendedEvents.slice(0, 4).map((attendance, index) => (
            <div className="memberActivityItem" key={attendance._id || attendance.eventKey || index}>
              <span>{attendance.eventName || "Community event"}</span>
              {typeof attendance.pointsEarned === "number" && (
                <strong>+{attendance.pointsEarned}</strong>
              )}
            </div>
          ))
        ) : (
          <p className="memberModalEmpty">No attended events recorded yet.</p>
        )}
      </section>
    </div>
  );
}

export default MemberModal;
