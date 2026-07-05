import React from "react";
import Aqfriend from "../../components/Aqfriend";
function MemberWidget() {
  const userPreferences = {
    active: [
      {
        name: "Maya Johnson",
        img: "https://randomuser.me/api/portraits/women/12.jpg",
      },
      {
        name: "Jordan Carter",
        img: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        name: "Aisha Robinson",
        img: "https://randomuser.me/api/portraits/women/31.jpg",
      },
      {
        name: "Marcus Williams",
        img: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      {
        name: "Nia Thompson",
        img: "https://randomuser.me/api/portraits/women/54.jpg",
      },
    ],
    favs: [
      {
        name: "David Brooks",
        img: "https://randomuser.me/api/portraits/men/61.jpg",
      },
      {
        name: "Imani Davis",
        img: "https://randomuser.me/api/portraits/women/66.jpg",
      },
      {
        name: "Elijah Harris",
        img: "https://randomuser.me/api/portraits/men/72.jpg",
      },
      {
        name: "Zaria Moore",
        img: "https://randomuser.me/api/portraits/women/81.jpg",
      },
      {
        name: "Caleb Jackson",
        img: "https://randomuser.me/api/portraits/men/90.jpg",
      },
    ],
  };
  return (
    <>
   
      <h2 className="memwidTitle fontdiner-swanky-regular">Active Members</h2>
      <div className="friendCrawlContainer">
        {userPreferences.active.map((amem,i) => {
          return (
            <div key={i}>
              <Aqfriend friendObj={amem} />
            </div>
          );
        })}
      </div>
      <h2 className="memwidTitle fontdiner-swanky-regular">Favorites List</h2>
      <div className="friendCrawlContainer">
        {userPreferences.favs.map((amem,j) => {
          return (
            <div key={j}>
              <Aqfriend friendObj={amem} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MemberWidget;
