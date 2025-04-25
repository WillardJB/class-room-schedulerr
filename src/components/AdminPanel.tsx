// src/components/AdminPanel.tsx
import { HomeIcon, UserIcon, AcademicCapIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/outline';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/admin/dashboard" className="flex items-center space-x-4 hover:text-blue-400">
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="/admin/rooms" className="flex items-center space-x-4 hover:text-blue-400">
                <UserIcon className="h-5 w-5" />
                <span>Rooms</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="/admin/classes" className="flex items-center space-x-4 hover:text-blue-400">
                <AcademicCapIcon className="h-5 w-5" />
                <span>Classes</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="/admin/schedule" className="flex items-center space-x-4 hover:text-blue-400">
                <CalendarIcon className="h-5 w-5" />
                <span>Schedule</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="/admin/settings" className="flex items-center space-x-4 hover:text-blue-400">
                <CogIcon className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        {/* Content will be displayed here */}
        <h2 className="text-3xl font-semibold text-gray-800">Welcome to the Admin Panel</h2>
      </div>
    </div>
  );
};

export default AdminPanel;
