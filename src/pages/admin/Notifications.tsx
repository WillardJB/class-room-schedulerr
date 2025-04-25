// src/pages/admin/Notifications.tsx
import { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Fetch notifications from an API or database
    setNotifications([
      'New class scheduled for tomorrow.',
      'Room 101 needs maintenance.',
    ]);
  }, []);

  const dismissNotification = (index: number) => {
    setNotifications((prevNotifications) => 
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            {notification}
            <button onClick={() => dismissNotification(index)} className="dismiss-btn">Dismiss</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;