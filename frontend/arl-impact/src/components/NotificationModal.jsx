function getNotificationAccent(type = "") {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("direct")) {
    return { icon: "DM", label: "Direct Message", tone: "direct" };
  }

  if (normalizedType.includes("event")) {
    return { icon: "EV", label: "Event Update", tone: "event" };
  }

  if (normalizedType.includes("member")) {
    return { icon: "MB", label: "Member Update", tone: "member" };
  }

  if (normalizedType.includes("user")) {
    return { icon: "US", label: "Account Update", tone: "user" };
  }

  return { icon: "AR", label: type || "Notification", tone: "general" };
}

function formatNotificationTime(createdAt) {
  if (!createdAt) return "Just now";

  return new Date(createdAt).toLocaleString();
}

function NotificationModal({ notifications = [] }) {
  const newestNotification = notifications[0];

  return (
    <div className="notificationModalTemplate">
      <section className="notificationHero">
        <div>
          <p className="notificationEyebrow">Impact Inbox</p>
          <h2 className="notificationTitle fontdiner-swanky-regular">
            {notifications.length} {notifications.length === 1 ? "update" : "updates"}
          </h2>
        </div>
        {newestNotification && (
          <p className="notificationHeroTime">
            Latest: {formatNotificationTime(newestNotification.createdAt)}
          </p>
        )}
      </section>

      {notifications.length === 0 ? (
        <section className="notificationEmptyState">
          <span className="notificationEmptyIcon fontdiner-swanky-regular">0</span>
          <h3>No new notifications</h3>
          <p>You are all caught up. New activity will appear here when it happens.</p>
        </section>
      ) : (
        <div className="notificationTimeline">
          {notifications.map((notification) => {
            const accent = getNotificationAccent(notification.type);

            return (
              <article
                className={`notificationCard notificationCard-${accent.tone}`}
                key={notification.id}
              >
                <span className="notificationBadge fontdiner-swanky-regular">{accent.icon}</span>
                <div className="notificationCardBody">
                  <div className="notificationCardHeader">
                    <p className="notificationEyebrow">{accent.label}</p>
                    <time>{formatNotificationTime(notification.createdAt)}</time>
                  </div>
                  <p className="notificationMessage">{notification.message}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NotificationModal;
