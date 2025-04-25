// src/components/NotificationBell.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './NotificationBell.css'; // Optional: for styling

interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void; // Function to handle click
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, onClick }) => {
  return (
    <div className="notification-bell" onClick={onClick}>
      <FontAwesomeIcon icon={faBell} />
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
};

export default NotificationBell;