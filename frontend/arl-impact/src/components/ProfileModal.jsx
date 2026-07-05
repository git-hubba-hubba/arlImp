import {React,useState} from "react";
import { apiRequest } from "../api";
import UserWidget from "./UserWidget";

const defaultUser = {
  username: "Guest User",
  userEmail: "Sign in to edit your profile",
  userImage: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=1400&auto=format&fit=crop&q=60",
  userOccupation: "Community Member",
  userPoints: 0,
  userBadgeTier: "Guest",
};

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

  const handleChange = (e) => {
    const value = e.target.name === "userPoints" ? Number(e.target.value) : e.target.value;

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
        <img
          src={formData.userImage || defaultUser.userImage}
          alt={formData.username}
          className="userProfImg"
        />
        <div className="proCanDesc">
          <h1 className="procanTitle fontdiner-swanky-regular">
            {formData.username}
          </h1>
          <h3 className="procanMotto">
            {formData.userOccupation}
          </h3>
          <p className="procanSlice">{formData.userEmail}</p>
          <p className="procanSlice">{formData.userBadgeTier}</p>
          <img src="https://maxst.icons8.com/vue-static/icon/popular-request/request-social-media.png" alt="" className="smedPro" />
        </div>
      </div>
      {isEditing && (
        <form className="profileEditForm" onSubmit={handleSubmit}>
          <input className="frmSU" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          <input className="frmSU" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Email" type="email" />
          <input className="frmSU" name="userImage" value={formData.userImage} onChange={handleChange} placeholder="Profile Image URL" />
          <input className="frmSU" name="userOccupation" value={formData.userOccupation} onChange={handleChange} placeholder="Occupation" />
          <input className="frmSU" name="userPoints" value={formData.userPoints} onChange={handleChange} placeholder="Points" type="number" />
          <input className="frmSU" name="userBadgeTier" value={formData.userBadgeTier} onChange={handleChange} placeholder="Badge Tier" />
          <button className="signUp formSubmit" type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}
      <hr />
      <div className="openProContainer">
        <div className="procanBadge">
          <button className="signUp profileAction" type="button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
          {loggedUserInfo && (
            <button className="signUp profileAction" type="button" onClick={onLogout}>
              Log Out
            </button>
          )}
        </div>
        <div className="procanPoints"> {formData.userPoints} xp</div>
        <UserWidget />
        <div className="procanImage">
        {status && <p className="formStatus">{status}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
