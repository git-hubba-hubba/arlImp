import React from "react";

function Theater() {
    const infoMovie={
        aboutUs: {
            name: "About Us",
            img: "",
            desc: ""
        }
    }
  return (
    <>
      <div className="theaterContainer">
        <div className="screen">
            <div className="lefteye">
                <h1 className="screenMarquee fontdiner-swanky-regular">About Us</h1>
                <img src="https://images.unsplash.com/photo-1782771115010-b287a78d2b4e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="screenPoster" />
            </div>
            <div className="tboz">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut illum quo placeat ratione! Voluptates vel est ratione quod temporibus, officiis laudantium consectetur!
            </div>


        </div>
        <div className="theaterBtn">
          <div className="thBtn fontdiner-swanky-regular">About Us</div>
          <div className="thBtn fontdiner-swanky-regular">FAQs</div>
          <div className="thBtn fontdiner-swanky-regular">Contact</div>
        </div>
      </div>
    </>
  );
}

export default Theater;
