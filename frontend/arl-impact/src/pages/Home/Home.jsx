import React, { useState } from "react";
import JoinComp from "../../components/JoinComp";
import AdSliver from "../../components/AdSliver";
import BusinessQuad from "../../components/BusinessQuad";

import Modal from "../../components/Modal";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import NameSpace from "../../components/NameSpace";

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


      <div className="envisionContainer">
        
        
        <h1 className="envisionTxt"><span className="spamWord fontdiner-swanky-regular">Envision </span> a community where Giving, Sharing and Caring happens. <br /><br />A community where people have the tools and resources to improve their lives and the lives of their family through <span className="spamWord fontdiner-swanky-regular">education and action.</span><br /><br /> A community where businesses give back and people <span className="spamWord fontdiner-swanky-regular">donate</span>  their timeand things they no longer use or need to help others. <br /><br />A community where <span className="spamWord fontdiner-swanky-regular">EVERYONE</span> plays a role and <span className="spamWord fontdiner-swanky-regular">EVERYONE</span> benefits. YES EVERYONE!  That’s the vision, now let’s work to make it a reality.</h1>

      </div>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/TmbWyO77M-8?si=Z9ysdWhNZy_go9Gy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <img className="adspaceimg" src="https://arlington.impactingcitiestx.com/wp-content/uploads/2025/11/Postcard-side-2-1024x732.jpg" alt="" />
    </>
  );
}

export default Home;
