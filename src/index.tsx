import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Rooms from './pages/admin/Rooms';
import Classes from './pages/admin/Classes';
import Schedule from './pages/admin/Schedule';
import Settings from './pages/admin/Settings';

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="classes" element={<Classes />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/" element={<h1>Home Page</h1>} />
    </Routes>
  );
};

export default App; // <-- This line is necessary
