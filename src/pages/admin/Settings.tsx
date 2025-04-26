// src/pages/admin/Settings.tsx
import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    systemName: '',
    email: '',
    phone: '',
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate email and phone
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setNotification('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      setNotification('Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    // Simulate saving data (can be replaced with an API call)
    setTimeout(() => {
      setNotification('Settings saved successfully!');
      setLoading(false);
      // Save to localStorage or API here
      localStorage.setItem('systemSettings', JSON.stringify(formData));
    }, 1500);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (isDarkMode) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };

  return (
    <main className={`min-h-screen py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto">
        <h1 className={`settings-title ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>System Settings</h1>

        {/* Notification */}
        {notification && (
          <div className="notification">
            {notification}
          </div>
        )}

        <form className="settings-form" onSubmit={handleSubmit}>
          <label htmlFor="systemName">System Name</label>
          <input
            type="text"
            id="systemName"
            name="systemName"
            value={formData.systemName}
            onChange={handleChange}
            placeholder="Enter system name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </form>

        <div className="mt-8">
          <h2 className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Appearance Settings</h2>
          <div className="dark-mode-toggle">
            <label htmlFor="darkMode" className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Dark Mode
            </label>
            <input
              type="checkbox"
              id="darkMode"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
