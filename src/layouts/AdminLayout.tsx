// src/layouts/AdminLayout.tsx
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faDoorOpen, faChalkboardTeacher, faCalendarAlt, faCog, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import NotificationBell from '../components/NotificationBell'; // Import the NotificationBell component
import './AdminLayout.css';
import { useState } from 'react';

const AdminLayout = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Example unread count

  const handleBellClick = () => {
    // Logic to show notifications
    console.log('Bell clicked!');
    // You can also reset the unread count here if needed
    setUnreadNotifications(0);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">Admin Panel</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/admin/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/rooms">
              <FontAwesomeIcon icon={faDoorOpen} /> Rooms
            </Link>
          </li>
          <li>
            <Link to="/admin/classes">
              <FontAwesomeIcon icon={faChalkboardTeacher} /> Classes
            </Link>
          </li>
          <li>
            <Link to="/admin/schedule">
              <FontAwesomeIcon icon={faCalendarAlt} /> Schedule
            </Link>
          </li>
          <li>
            <Link to="/admin/settings">
              <FontAwesomeIcon icon={faCog} /> Settings
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <FontAwesomeIcon icon={faUsers} /> Users 
            </Link>
          </li>
        </ul>
        <div className="logout-button">
          <button>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Admin Dashboard</h1>
          <div className="header-right">
            <div className="notification-bell-container">
              <NotificationBell 
                unreadCount={unreadNotifications} 
                onClick={handleBellClick} 
              />
            </div>
            <div className="profile-dropdown">
              <button className="profile-btn">Profile</button>
              <div className="dropdown-content">
                <Link to="/admin/settings">Settings</Link>
                <button>Logout</button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <Outlet /> {/* Content will change based on the route */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;