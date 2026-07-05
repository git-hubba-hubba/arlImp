import React from "react";
import Calendar from "./Calendar";
import NotificationModal from "./NotificationModal";
import ProfileModal from "./ProfileModal";
function Nav({setCurrentBoard, onOpenModal, currentUser, onUserUpdate, onLogout, notifications = []}) {

  return (
    <>
      <div className="navMain">
        <div className="navTriFold">
          <div className="nFold1">
            <img src="https://arlington.impactingcitiestx.com/wp-content/uploads/2025/09/IMPACT-OFFICIAL-Logo-2048x773.png" alt="" className="impactLogo" onClick={()=>{
              setCurrentBoard("Home")
            }} />
          </div>
          <div className="nFold2">
            <div className="navGuide" onClick={()=>{
              setCurrentBoard("Feed")
            }}>Feed</div>
            <div className="navGuide" onClick={()=>{
              setCurrentBoard("Member")
            }}>Members</div>
            <div className="navGuide" onClick={()=>{
              setCurrentBoard("Events")
            }}>Local</div>
          </div>
          <div className="nFold3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/42/42371.png"
              alt="Calendar"
              className="navIcon"
              onClick={() =>
                onOpenModal({
                  title: "Event Calendar",
                  component: Calendar,
                })
              }
            />
            {/* Event Calendar */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/565/565422.png"
              alt="Notifications"
              className="navIcon"
              onClick={() =>
                onOpenModal({
                  title: "Notifications",
                  component: NotificationModal,
                  componentProps: { notifications },
                })
              }
            />
            {/* Notifications */}
            <img
              src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              alt="Profile"
              className="navIcon"
              onClick={() =>
                onOpenModal({
                  title: "Profile",
                  component: ProfileModal,
                  componentProps: {
                    loggedUserInfo: currentUser,
                    onUserUpdate,
                    onLogout,
                  },
                })
              }
            />
            {/* Profile */}
          </div>
        </div>
        <h2 className="fontdiner-swanky-regular"style={{color:'black'}}>United by Purpose, Strengthened by Community</h2>
      </div>
    </>
  );
}

export default Nav;
