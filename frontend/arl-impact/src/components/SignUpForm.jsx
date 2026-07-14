import React, { useState } from "react";
import { apiRequest } from "../api";

const initialForm = {
  username: "",
  userEmail: "",
  userPassword: "",
  passwordConfirmation: "",
  userImage: "",
  userOccupation: "",
};

function SignUpForm({ onAuthSuccess, onNotify }) {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setIsSaving(true);

    try {
      const result = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          userPoints: 0,
          userBadgeTier: "Bronze",
        }),
      });

      onNotify?.("member", `${result.user.username} was added as a member.`);
      onAuthSuccess?.({ token: result.token, user: result.user });
      setStatus("Account created.");
      setFormData(initialForm);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="authModalTemplate authSignupTemplate">
      <div className="authModalHero">
        <div>
          <p className="authModalEyebrow">New Member</p>
          <h2 className="authModalTitle fontdiner-swanky-regular">Register To Join</h2>
          <p className="authModalCopy">
            Create your profile, start with a Bronze badge, and begin collecting attendance points around Arlington.
          </p>
        </div>
        <div className="authBadgeStack">
          <div>
            <span>Starting Tier</span>
            <strong>Bronze</strong>
          </div>
          <div>
            <span>Opening Points</span>
            <strong>0</strong>
          </div>
        </div>
      </div>

      <div className="authModalBody">
        <form className="authFormCard authSignupForm" onSubmit={handleSubmit}>
          <label className="authField">
            <span>Username</span>
            <input type="text" className="frmSU" placeholder="Community name" name="username" value={formData.username} onChange={handleChange} required />
          </label>
          <label className="authField">
            <span>Email</span>
            <input type="email" className="frmSU" placeholder="name@example.com" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
          </label>
          <label className="authField">
            <span>Password</span>
            <input type="password" className="frmSU" placeholder="Create a password" name="userPassword" value={formData.userPassword} onChange={handleChange} required />
          </label>
          <label className="authField">
            <span>Confirm Password</span>
            <input
              type="password"
              className="frmSU"
              placeholder="Confirm password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />
          </label>
          <label className="authField authFieldWide">
            <span>Profile Image URL</span>
            <input
              type="text"
              className="frmSU"
              placeholder="Optional image link"
              name="userImage"
              value={formData.userImage}
              onChange={handleChange}
            />
          </label>
          <label className="authField authFieldWide">
            <span>Occupation</span>
            <input type="text" className="frmSU" placeholder="Artist, owner, volunteer..." name="userOccupation" value={formData.userOccupation} onChange={handleChange} />
          </label>
          <button className="signUp formSubmit authSubmit" type="submit" disabled={isSaving}>
            {isSaving ? "Creating..." : "Create Account"}
          </button>
          {status && <p className="formStatus authStatus">{status}</p>}
        </form>

        <aside className="authSidePanel">
          <p className="modalEyebrow">Member profile preview</p>
          <div className="authPreviewCard">
            <div className="authPreviewAvatar">
              {formData.userImage ? <img src={formData.userImage} alt="" /> : <span>{formData.username?.charAt(0) || "A"}</span>}
            </div>
            <strong>{formData.username || "Arlington Member"}</strong>
            <span>{formData.userOccupation || "Local impact builder"}</span>
            <p>Bronze badge ready once your account is created.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default SignUpForm;
