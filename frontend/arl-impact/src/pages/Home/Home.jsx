import React, { useState } from "react";
import JoinComp from "../../components/JoinComp";
import AdSliver from "../../components/AdSliver";
import BusinessQuad from "../../components/BusinessQuad";

import Modal from "../../components/Modal";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";

function Home({ onAuthSuccess, onNotify }) {
  const [activeModal, setActiveModal] = useState(null);

  const handleAuthSuccess = (auth) => {
    onAuthSuccess?.(auth);
    setActiveModal(null);
  };

  let adArr = [
    {
      adTittle: "Register An Account",
      adDesc: "Sign Up Online",
      adImg:
        "https://simg.nicepng.com/png/small/454-4549634_group-men-comments-team-business-png-icon.png",
    },
    {
      adTittle: "Participate In Community Events",
      adDesc: "Engage with Local Events",
      adImg:
        "https://www.freeiconspng.com/uploads/business-people-meeting--free-business-icons-17.png",
    },
    {
      adTittle: "Make an Impact",
      adDesc: "Earn Rewards and Business Incentives",
      adImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KZEq13qCjtqUX0ZDgV5lUkZXvlYWz18JorzE1gI7zQ&s",
    },
  ];
  return (
    <>
      <JoinComp
        onSignUp={() =>
          setActiveModal({
            title: "Sign Up",
            component: SignUpForm,
            componentProps: { onAuthSuccess: handleAuthSuccess, onNotify },
          })
        }
        onLogin={() =>
          setActiveModal({
            title: "Log In",
            component: LoginForm,
            componentProps: { onAuthSuccess: handleAuthSuccess },
          })
        }
      />
      <Modal
        isOpen={Boolean(activeModal)}
        onClose={() => setActiveModal(null)}
        title={activeModal?.title}
        component={activeModal?.component}
        componentProps={activeModal?.componentProps}
      />
      <AdSliver adObj={adArr[0]} />
      <AdSliver adObj={adArr[1]} />
      <AdSliver adObj={adArr[2]} />

      <img src="https://arlington.impactingcitiestx.com/wp-content/uploads/2025/09/IMPACT-OFFICIAL-Logo-2048x773.png" alt="" className="logoBearer" />
      <BusinessQuad />
      <img className="adspaceimg" src="https://arlington.impactingcitiestx.com/wp-content/uploads/2025/11/Postcard-side-2-1024x732.jpg" alt="" />
    </>
  );
}

export default Home;
