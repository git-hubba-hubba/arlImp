import React, { useState } from "react";
import { apiRequest } from "../api";

function LoginForm({ onAuthSuccess }) {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
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
      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      onAuthSuccess?.({ token: result.token, user: result.user });
      setStatus("Signed in.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="authModalTemplate authLoginTemplate">
      <div className="authModalHero">
        <div>
          <p className="authModalEyebrow">Member Access</p>
          <h2 className="authModalTitle fontdiner-swanky-regular">Welcome Back</h2>
          <p className="authModalCopy">
            Jump back into Arlington Impact, check your notifications, manage events, and keep building your local footprint.
          </p>
        </div>
        <div className="authBadgeStack">
          <div>
            <span>Impact</span>
            <strong>Dashboard</strong>
          </div>
          <div>
            <span>Member</span>
            <strong>Check In</strong>
          </div>
        </div>
      </div>

      <div className="authModalBody">
        <form className="authFormCard" onSubmit={handleSubmit}>
          <label className="authField">
            <span>Email</span>
            <input type="email" className="frmSU" placeholder="name@example.com" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
          </label>
          <label className="authField">
            <span>Password</span>
            <input type="password" className="frmSU" placeholder="Enter your password" name="userPassword" value={formData.userPassword} onChange={handleChange} required />
          </label>
          <button className="signUp formSubmit authSubmit" type="submit" disabled={isSaving}>
            {isSaving ? "Signing In..." : "Sign In"}
          </button>
          {status && <p className="formStatus authStatus">{status}</p>}
        </form>

        <aside className="authSidePanel">
          <p className="modalEyebrow">Your account unlocks</p>
          <div className="authPerkGrid">
            <span>Saved events</span>
            <span>Direct messages</span>
            <span>Badges</span>
            <span>Attendance points</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default LoginForm;
