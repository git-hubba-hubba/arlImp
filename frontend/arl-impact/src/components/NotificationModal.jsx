import React from "react";

function NotificationModal({ notifications = [] }) {
  return (
    <div className="modalDetail">
      {notifications.length === 0 ? (
        <p>You do not have any new notifications right now.</p>
      ) : (
        <div className="notificationList">
          {notifications.map((notification) => (
            <div className="notificationItem" key={notification.id}>
              <p className="modalEyebrow">{notification.type}</p>
              <p>{notification.message}</p>
              <p className="notificationTime">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationModal;
