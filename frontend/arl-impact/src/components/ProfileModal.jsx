import { React, useState } from "react";
import { apiRequest } from "../api";
import UserWidget from "./UserWidget";

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
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const attendedEvents = user.attendedEvents || [];

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
    <div className="modalDetail">
      <div className="profileCan">
        <div>
        <h1 className="procanTitle fontdiner-swanky-regular">
            {formData.username}
          </h1>
          <img
            src={formData.userImage || defaultUser.userImage}
            alt={formData.username}
            className="userProfImg"
          />
          
        </div>
        <div className="proCanDesc">
          
          <h3 className="procanMotto fontdiner-swanky-regular">{formData.userOccupation}</h3>
          <div className="profileCaddy">
            <div className="infoBracket">
              <p className="procanSlice fontdiner-swanky-regular">
                {formData.userEmail}
              </p>
              <UserWidget points={formData.userPoints} />
              
              <div className="procanBadge">
          <button
            className="signUp profileAction"
            type="button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
          {loggedUserInfo && (
            <button
              className="signUp profileAction"
              type="button"
              onClick={onLogout}
            >
              Log Out
            </button>
          )}
        </div>
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <form className="profileEditForm" onSubmit={handleSubmit}>
          <input
            className="frmSU"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            className="frmSU"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
          <input
            className="frmSU"
            name="userImage"
            value={formData.userImage}
            onChange={handleChange}
            placeholder="Profile Image URL"
          />
          <input
            className="frmSU"
            name="userOccupation"
            value={formData.userOccupation}
            onChange={handleChange}
            placeholder="Occupation"
          />
          <input
            className="frmSU"
            name="userPoints"
            value={formData.userPoints}
            onChange={handleChange}
            placeholder="Points"
            type="number"
          />
          <input
            className="frmSU"
            name="userBadgeTier"
            value={formData.userBadgeTier}
            onChange={handleChange}
            placeholder="Badge Tier"
          />
          <button
            className="signUp formSubmit"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}
      <div className="procanImage">
          {status && <p className="formStatus">{status}</p>}
        </div>
      
      <div className="openProContainer">
       <div className="blossom">
       
        <img src="https://cdna.artstation.com/p/assets/images/images/074/370/650/original/anders-gjendem-superearthspin2.gif?1711920491" alt="" className="badgeMove" />
        <p className="procanSlice fontdiner-swanky-regular">
                {formData.userBadgeTier}
              </p>
       </div>
       <div className="bubbles">Events Attended:
        <hr />
        {attendedEvents.length > 0 ? (
          attendedEvents.map((attendance, index) => (
            <img
              key={attendance._id || attendance.eventKey || `${attendance.event}-${index}`}
              src={EVENT_TICKET_IMAGE}
              alt={attendance.eventName || "Attended event"}
              className="evTix"
              title={attendance.eventName}
            />
          ))
        ) : (
          <p className="emptyAttendance">No events attended yet.</p>
        )}
        </div>
       <div className="buttercup">Member Engagement:
        <hr />
        <img src="https://www.freeiconspng.com/thumbs/fist-png/fist-png-10.png" alt="" className="evFist" />
        <img src="https://www.freeiconspng.com/thumbs/fist-png/fist-png-10.png" alt="" className="evFist" />
        <img src="https://www.freeiconspng.com/thumbs/fist-png/fist-png-10.png" alt="" className="evFist" />
        <img src="https://www.freeiconspng.com/thumbs/fist-png/fist-png-10.png" alt="" className="evFist" />
        <img src="https://www.freeiconspng.com/thumbs/fist-png/fist-png-10.png" alt="" className="evFist" />
        <img src="https://www.freeiconspng.com/thumbs/fist-png/fist-png-10.png" alt="" className="evFist" />
        <img src="https://www.freeiconspng.com/thumbs/fist-png/fist-png-10.png" alt="" className="evFist" />
         </div>

        
      </div>
    </div>
  );
}

export default ProfileModal;
