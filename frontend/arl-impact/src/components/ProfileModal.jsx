import { useState } from "react";
import { apiRequest } from "../api";
import HomeWidget from "../pages/Home/HomeWidget";
import { isVideoMedia } from "../utils/media";
import MediaUploadButton from "./MediaUploadButton";
import Modal from "./Modal";
import RewardsDashboard from "./RewardsDashboard";

const defaultUser = {
  username: "Guest User",
  userEmail: "Sign in to edit your profile",
  userImage:
    "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=1400&auto=format&fit=crop&q=60",
  userOccupation: "Community Member",
  userPoints: 0,
  userBadgeTier: "Guest",
};

const EVENT_TICKET_IMAGE =
  "https://png.pngtree.com/png-vector/20250816/ourlarge/pngtree-vintage-ticket-template-with-title-and-text-space-on-white-background-png-image_17169675.webp";

function getTierClass(tier) {
  return String(tier || "guest").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getProfileProgress(points) {
  if (points >= 1000) return 100;
  if (points >= 500) return 76;
  if (points >= 250) return 52;
  if (points > 0) return 28;

  return 10;
}

function ProfileModal({ loggedUserInfo, onUserUpdate, onLogout }) {
  const user = loggedUserInfo || defaultUser;
  const [formData, setFormData] = useState({
    username: user.username || "",
    userEmail: user.userEmail || "",
    userImage: user.userImage || user.userImg || "",
    userOccupation: user.userOccupation || user.userDesc || "",
    userPoints: user.userPoints || 0,
    userBadgeTier: user.userBadgeTier || "Bronze",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const attendedEvents = user.attendedEvents || [];
  const tierClass = getTierClass(formData.userBadgeTier);
  const profileProgress = getProfileProgress(Number(formData.userPoints) || 0);

  const handleChange = (e) => {
    const value =
      e.target.name === "userPoints" ? Number(e.target.value) : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user._id) {
      setStatus("Sign in before editing your profile.");
      return;
    }

    setStatus("");
    setIsSaving(true);

    try {
      const result = await apiRequest(`/users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      onUserUpdate?.(result.user);
      setIsEditing(false);
      setStatus("Profile updated.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`profileModalTemplate profileTier-${tierClass}`}>
      <section className="profileModalHero">
        {isVideoMedia(formData.userImage) ? (
          <video
            className="profileModalImage"
            controls
            src={formData.userImage}
          />
        ) : (
          <img
            src={formData.userImage || defaultUser.userImage}
            alt={formData.username}
            className="profileModalImage"
          />
        )}
        <div className="profileModalIntro">
          <p className="profileModalEyebrow">{formData.userBadgeTier}</p>
          <h2 className="profileModalName fontdiner-swanky-regular">
            {formData.username || "Community Member"}
          </h2>
          <p>{formData.userOccupation || "Community Member"}</p>
          <p>{formData.userEmail}</p>
          <div className="profileModalActions">
            <button
              className="signUp profileAction"
              type="button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
            <button
              className="signUp profileAction"
              type="button"
              onClick={() => setIsRewardsOpen(true)}
            >
              My Rewards
            </button>
            {loggedUserInfo && (
              <button className="signUp profileAction" type="button" onClick={onLogout}>
                Log Out
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="profileModalStats">
        <div>
          <span>Points</span>
          <strong>{formData.userPoints}</strong>
        </div>
        <div>
          <span>Events</span>
          <strong>{attendedEvents.length}</strong>
        </div>
        <div>
          <span>Badge</span>
          <strong>{formData.userBadgeTier}</strong>
        </div>
      </section>

      <section className="profileBadgeJourney">
        <div className="profileBadgeHeader">
          <span className="profileBadgeOrb fontdiner-swanky-regular">
            {String(formData.userBadgeTier || "B").charAt(0)}
          </span>
          <div>
            <p className="profileModalEyebrow">Impact Journey</p>
            <h3>{profileProgress}% toward the next milestone</h3>
          </div>
        </div>
        <div className="profileProgressTrack">
          <div className="profileProgressFill" style={{ width: `${profileProgress}%` }} />
        </div>
      </section>

      {isEditing && (
        <form className="profileEditForm profileEditPanel" onSubmit={handleSubmit}>
          <input className="frmSU" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          <input className="frmSU" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Email" type="email" />
          <MediaUploadButton
            accept="image/*,video/*"
            label="Upload Profile Media"
            name="userImage"
            onChange={handleChange}
            value={formData.userImage}
          />
          <input className="frmSU" name="userOccupation" value={formData.userOccupation} onChange={handleChange} placeholder="Occupation" />
          <input className="frmSU" name="userPoints" value={formData.userPoints} onChange={handleChange} placeholder="Points" type="number" />
          <input className="frmSU" name="userBadgeTier" value={formData.userBadgeTier} onChange={handleChange} placeholder="Badge Tier" />
          <button className="signUp formSubmit" type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}

      {status && <p className="formStatus">{status}</p>}

      <section className="profileModalGrid">
        <HomeWidget currentUser={loggedUserInfo} />
        <div className="profileTicketsPanel">
          <h3 className="fontdiner-swanky-regular">Attendance Passport</h3>
          {attendedEvents.length > 0 ? (
            <div className="profileTicketGrid">
              {attendedEvents.map((attendance, index) => (
                <img
                  key={attendance._id || attendance.eventKey || `${attendance.event}-${index}`}
                  src={EVENT_TICKET_IMAGE}
                  alt={attendance.eventName || "Attended event"}
                  className="evTix"
                  title={attendance.eventName}
                />
              ))}
            </div>
          ) : (
            <p className="emptyAttendance">No events attended yet.</p>
          )}
        </div>
      </section>
      <Modal
        isOpen={isRewardsOpen}
        onClose={() => setIsRewardsOpen(false)}
        title="My Rewards"
        component={RewardsDashboard}
        componentProps={{ userPoints: formData.userPoints }}
      />
    </div>
  );
}

export default ProfileModal;
