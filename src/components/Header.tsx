// src/components/Header.tsx
import React, { useState } from 'react';
import NotificationBell from './NotificationBell';

const Header: React.FC = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(5); // Example unread count

  const handleBellClick = () => {
    // Logic to show notifications
    console.log('Bell clicked!');
    // You can also reset the unread count here if needed
    setUnreadNotifications(0);
  };

  return (
    <header>
      <h1>My Application</h1>
      <NotificationBell unreadCount={unreadNotifications} onClick={handleBellClick} />
    </header>
  );
};

export default Header;