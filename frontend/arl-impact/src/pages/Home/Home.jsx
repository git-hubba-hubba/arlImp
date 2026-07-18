import JoinComp from "../../components/JoinComp";
import AdSliver from "../../components/AdSliver";
import BusinessQuad from "../../components/BusinessQuad";
import HomeCommunityAside from "../../components/HomeCommunityAside";
import HomePostcardSlider from "../../components/HomePostcardSlider";
import HomeImpactHero from "../../components/HomeImpactHero";
import NameSpace from "../../components/NameSpace";

import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";

const impactSteps = [
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

function Home({ onAuthSuccess, onNotify, onOpenModal }) {
  const handleAuthSuccess = (auth) => {
    onAuthSuccess?.(auth);
  };

  return (
    <main className="homePage">
      <HomeImpactHero />

      <HomePostcardSlider />

      <section className="homeSection homeJoinSection">
        <NameSpace name="Join Community" />
        <JoinComp
          onSignUp={() =>
            onOpenModal?.({
              title: "Sign Up",
              component: SignUpForm,
              componentProps: { onAuthSuccess: handleAuthSuccess, onNotify },
            })
          }
          onLogin={() =>
            onOpenModal?.({
              title: "Log In",
              component: LoginForm,
              componentProps: { onAuthSuccess: handleAuthSuccess },
            })
          }
        />
        <HomeCommunityAside />
      </section>

      <section className="homeSection">
        <NameSpace name="Get Started" />
        <div className="homeStepGrid">
          {impactSteps.map((step) => (
            <AdSliver key={step.adTittle} adObj={step} />
          ))}
        </div>
      </section>

      <section className="homeSection homeRolesSection">
        <img
          src="https://arlington.impactingcitiestx.com/wp-content/uploads/2025/09/IMPACT-OFFICIAL-Logo-2048x773.png"
          alt="Impact Arlington"
          className="logoBearer"
        />
        <NameSpace name="Member Roles" />
        <BusinessQuad />
      </section>

      <h2 className="homeTogetherTitle">We’re In This Together!</h2>
    </main>
  );
}

export default Home;
