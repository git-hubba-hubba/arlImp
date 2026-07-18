import "./App.css";
import { useState } from "react";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "./api";
import { takeDirectMessagesForUser } from "./utils/directMessages";
import { createNotification, getStoredNotifications, setStoredNotifications } from "./utils/notifications";
import Nav from "./components/Nav";
import Modal from "./components/Modal";
import EventModal from "./components/EventModal";
import EventCommentsModal from "./components/EventCommentsModal";
import MemberModal from "./components/MemberModal";
import FeedFilter from "./pages/Feed/FeedFilter";
import MembersFilter from "./pages/Member/MemberFilter";
import EventFilter from "./pages/Events/EventFilter";
import FeedMain from "./pages/Feed/FeedMain";
import MemberDashboard from "./pages/Member/MembersDashboard";
import EventDash from "./pages/Events/EventDash";
import FeedWidget from "./pages/Feed/FeedWidget";
import MemberWidget from "./pages/Member/MemberWidget";
import EventSmWid from "./components/EventSmWid";
import { featuredBusinesses } from "./data/featuredBusinesses";
import HomeFilter from "./pages/Home/HomeFilter";
import HomeWidget from './pages/Home/HomeWidget'
import Home from "./pages/Home/Home";
import DirectoryDashboard from "./pages/Directory/DirectoryDashboard";
function App() {
  // NavLogic
  const [currentBoard, setCurrentBoard] = useState("Home");
  const [activeModal, setActiveModal] = useState(null);
  const [auth, setAuth] = useState(() => getStoredAuth());
  const [notifications, setNotifications] = useState(() => getStoredNotifications());
  const [userLocation, setUserLocation] = useState(null);

  const openModal = (modalConfig) => {
    setActiveModal(modalConfig);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const addNotification = (type, message) => {
    const notification = createNotification(type, message);
    setNotifications((currentNotifications) => {
      const nextNotifications = [notification, ...currentNotifications].slice(0, 30);
      setStoredNotifications(nextNotifications);
      return nextNotifications;
    });
  };

  const handleAuthSuccess = (nextAuth) => {
    setStoredAuth(nextAuth);
    setAuth(nextAuth);
    addNotification("user", `${nextAuth.user.username} is logged in.`);
    takeDirectMessagesForUser(nextAuth.user).forEach((directMessage) => {
      addNotification(
        "direct message",
        `${directMessage.senderName}: ${directMessage.message}`
      );
    });
    closeModal();
  };

  const handleUserUpdate = (user) => {
    const nextAuth = { ...auth, user };
    setStoredAuth(nextAuth);
    setAuth(nextAuth);
  };

  const handleLogout = () => {
    clearStoredAuth();
    setAuth(null);
    addNotification("user", "User logged out.");
    closeModal();
  };

  return (
    <>
      <Nav
        setCurrentBoard={setCurrentBoard}
        onOpenModal={openModal}
        currentUser={auth?.user}
        onUserUpdate={handleUserUpdate}
        onLogout={handleLogout}
        notifications={notifications}
      />
      <Modal
        isOpen={Boolean(activeModal)}
        onClose={closeModal}
        title={activeModal?.title}
        component={activeModal?.component}
        componentProps={activeModal?.componentProps}
      />
      <div className="masterJmwofford">
        <div className="leftPanel">
          {currentBoard === "Home" ? <><HomeFilter /></> : null}
          {currentBoard === "Feed" ? (
            <>
              <FeedFilter />
            </>
          ) : null}
          {currentBoard === "Member" ? (
            <>
              <MembersFilter />
            </>
          ) : null}
          {currentBoard === "Events" ? (
            <>
              <EventFilter />
            </>
          ) : null}
          {currentBoard === "Directory" ? <HomeFilter /> : null}
        </div>

        <div className="midPanel">
          {currentBoard === "Home" ? (
            <Home
              onAuthSuccess={handleAuthSuccess}
              onNotify={addNotification}
              onOpenModal={openModal}
            />
          ) : null}
          {currentBoard === "Feed" ? (
            <>
              <FeedMain currentUser={auth?.user} />
            </>
          ) : null}
          {currentBoard === "Member" ? (
            <>
              <MemberDashboard
                onOpenModal={(member) =>
                  openModal({
                    title: member.username || member.name,
                    component: MemberModal,
                    componentProps: {
                      currentUser: auth?.user,
                      member,
                      onNotify: addNotification,
                    },
                  })
                }
              />
            </>
          ) : null}
          {currentBoard === "Events" ? (
            <>
              <EventDash
                currentUser={auth?.user}
                onNotify={addNotification}
                onUserLocationChange={setUserLocation}
                onUserUpdate={handleUserUpdate}
                onOpenModal={(event) =>
                  openModal({
                    title: event.eventName,
                    component: EventModal,
                    componentProps: {
                      event,
                      onOpenComments: () =>
                        openModal({
                          title: "",
                          component: EventCommentsModal,
                          componentProps: {
                            currentUser: auth?.user,
                            event,
                          },
                        }),
                    },
                  })
                }
              />
            </>
          ) : null}
          {currentBoard === "Directory" ? (
            <DirectoryDashboard listings={featuredBusinesses} />
          ) : null}
        </div>
        <div className="rightPanel">
          {currentBoard === "Home" ? (
            <HomeWidget
              businesses={featuredBusinesses}
              currentUser={auth?.user}
              userLocation={userLocation}
            />
          ) : null}
          {currentBoard === "Feed" ? (
            <>
              <FeedWidget />
            </>
          ) : null}
          {currentBoard === "Member" ? (
            <>
              <MemberWidget />
            </>
          ) : null}
          {currentBoard === "Events" ? (
            <>
              <EventSmWid />
            </>
          ) : null}
          {currentBoard === "Directory" ? (
            <HomeWidget businesses={featuredBusinesses} currentUser={auth?.user} userLocation={userLocation} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
