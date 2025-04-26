import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faDoorOpen, faChalkboardTeacher, faCalendarAlt, faCog, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import NotificationBell from '../components/NotificationBell';
import './AdminLayout.css';
import { useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleBellClick = () => {
    console.log('Bell clicked!');
    setUnreadNotifications(0);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      setLoggingOut(false);
      navigate('/'); // Redirect to login or home page
    }, 3000);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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
          <button onClick={handleLogoutClick}>
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
              <NotificationBell unreadCount={unreadNotifications} onClick={handleBellClick} />
            </div>
            <div className="profile-dropdown">
              <button className="profile-btn">Profile</button>
              <div className="dropdown-content">
                <Link to="/admin/settings">Settings</Link>
                <button onClick={handleLogoutClick}>Logout</button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {loggingOut ? (
              <div className="logging-out">
                <div className="spinner"></div>
                <p>Logging out...</p>
              </div>
            ) : (
              <>
                <p>Are you sure you want to logout?</p>
                <div className="modal-buttons">
                  <button className="confirm" onClick={confirmLogout}>Yes</button>
                  <button className="cancel" onClick={cancelLogout}>No</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
