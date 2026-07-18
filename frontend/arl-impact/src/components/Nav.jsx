import { useState } from "react";
import Calendar from "./Calendar";
import NotificationModal from "./NotificationModal";
import ProfileModal from "./ProfileModal";
function Nav({setCurrentBoard, onOpenModal, currentUser, onUserUpdate, onLogout, notifications = []}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navActions = [
    {
      label: "Calendar",
      icon: "https://cdn-icons-png.flaticon.com/512/42/42371.png",
      onSelect: () =>
        onOpenModal({
          title: "Event Calendar",
          component: Calendar,
          componentProps: { currentUser },
        }),
    },
    {
      label: "Notifications",
      icon: "https://cdn-icons-png.flaticon.com/512/565/565422.png",
      onSelect: () =>
        onOpenModal({
          title: "Notifications",
          component: NotificationModal,
          componentProps: { notifications },
        }),
    },
    {
      label: "Profile",
      icon: "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png",
      onSelect: () =>
        onOpenModal({
          title: "Profile",
          component: ProfileModal,
          componentProps: {
            loggedUserInfo: currentUser,
            onUserUpdate,
            onLogout,
          },
        }),
    },
  ];

  const handleMenuAction = (action) => {
    action.onSelect();
    setIsMenuOpen(false);
  };

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
            {navActions.map((action) => (
              <img
                key={action.label}
                src={action.icon}
                alt={action.label}
                className="navIcon"
                onClick={action.onSelect}
              />
            ))}
            <div className="navHamburgerWrap">
              <button
                className="navHamburger"
                type="button"
                aria-expanded={isMenuOpen}
                aria-label="Open navigation options"
                onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              {isMenuOpen && (
                <div className="navDropdown">
                  {navActions.map((action) => (
                    <button
                      className="navDropdownItem"
                      key={action.label}
                      type="button"
                      onClick={() => handleMenuAction(action)}
                    >
                      <img src={action.icon} alt="" className="navDropdownIcon" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <h2 className=""style={{color:'black',padding: "1em", fontFamily:"serif"}}>Welcome to Impact Arlington Texas <br />Where we come together as a community </h2>
      </div>
    </>
  );
}

export default Nav;
