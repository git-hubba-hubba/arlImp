import React, { useState } from "react";
import { apiRequest } from "../api";
import Namespace from "../components/NameSpace";

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
    <>
      <Namespace name={"First Time? Register2Join"} />
      <div className="formFitting">
        <form onSubmit={handleSubmit}>
          <input type="text" className="frmSU" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required />
          <input type="email" className="frmSU" placeholder="Email" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
          <input type="password" className="frmSU" placeholder="Password" name="userPassword" value={formData.userPassword} onChange={handleChange} required />
          <input
            type="password"
            className="frmSU"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="frmSU"
            placeholder="Profile Image URL"
            name="userImage"
            value={formData.userImage}
            onChange={handleChange}
          />

          <input type="text" className="frmSU" placeholder="Occupation" name="userOccupation" value={formData.userOccupation} onChange={handleChange} />
          <button className="signUp formSubmit" type="submit" disabled={isSaving}>
            {isSaving ? "Creating..." : "Create Account"}
          </button>
          {status && <p className="formStatus">{status}</p>}
        </form>

        <div className="asideForm">
          <img
            src="https://images.unsplash.com/photo-1699730164892-d7c433524ff3?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="blqForm"
          />
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
