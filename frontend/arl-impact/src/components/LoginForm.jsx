import React, { useState } from "react";
import { apiRequest } from "../api";
import Namespace from "../components/NameSpace";

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
    <>
    <Namespace name={"Already A Member? Sign In"}/>
      <div className="formFitting">
        <form onSubmit={handleSubmit}>
          <input type="email" className="frmSU" placeholder="Email" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
          <input type="password" className="frmSU" placeholder="Password" name="userPassword" value={formData.userPassword} onChange={handleChange} required />
          <button className="signUp formSubmit" type="submit" disabled={isSaving}>
            {isSaving ? "Signing In..." : "Sign In"}
          </button>
          {status && <p className="formStatus">{status}</p>}
        </form>

        <div className="asideForm">
          <img
            src="https://images.unsplash.com/photo-1779896412033-a488b4472745?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
            alt=""
            className="blqForm"
          />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
