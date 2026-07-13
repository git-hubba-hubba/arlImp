import { useState } from "react";

function Theater() {
  const infoMovie = {
    aboutUs: {
      title: "About Us",
      img: "https://images.unsplash.com/photo-1782771115010-b287a78d2b4e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Impact is more than a social platform it’s a community hub. Here we operate like a family/community within a community where people come together to improve their lives and their community. Areas of focus; health, finances, entertainment and the positive things in life.",
    },
    faqs: {
      title: "FAQs",
      img: "https://images.unsplash.com/photo-1665686377065-08ba896d16fd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGF1Z2hpbmd8ZW58MHx8MHx8fDA%3D",
      desc: ""
    },
    contact: {
      title: "Contact",
      img: "https://images.unsplash.com/photo-1583606784123-7c244f00d29c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhdWdoaW5nfGVufDB8fDB8fHww",
      desc: `Want to Advertise with Us? Interested in launching Impact in your city?  Want your corporation to Walk with Us? Have questions or need to understand Impact better. Give us a call: 682-305-1503  Vincent Jenkins CEO/Founder impactingcities101@gmail.com`,
    },
  };
  const [currentFilm, setCurrentFilm] = useState(infoMovie.aboutUs);
  return (
    <>
      <div className="theaterContainer">
        <div className="screen">
          <div className="lefteye">
            <h1 className="screenMarquee fontdiner-swanky-regular">
              {currentFilm.title}
            </h1>
            <img src={currentFilm.img} alt="" className="screenPoster" />
          </div>
          
          <div className="tboz">{currentFilm.desc}</div>
        </div>
        <div className="theaterBtn">
          <div
            className="thBtn fontdiner-swanky-regular"
            onClick={() => {
              setCurrentFilm(infoMovie.aboutUs);
            }}
          >
            About Us
          </div>
          <div
            className="thBtn fontdiner-swanky-regular"
            onClick={() => {
              setCurrentFilm(infoMovie.faqs);
            }}
          >
            FAQs
          </div>
          <div
            className="thBtn fontdiner-swanky-regular"
            onClick={() => {
              setCurrentFilm(infoMovie.contact);
            }}
          >
            Contact
          </div>
        </div>
      </div>
    </>
  );
}

export default Theater;
