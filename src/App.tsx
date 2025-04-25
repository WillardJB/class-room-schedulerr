// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Rooms from './pages/admin/Rooms';
import Classes from './pages/admin/Classes';
import Schedule from './pages/admin/Schedule';
import Settings from './pages/admin/Settings';
import Users from './pages/admin/Users'; // Import the Users component

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="classes" element={<Classes />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} /> {/* Add Users route */}
      </Route>
    </Routes>
  );
};

export default App;