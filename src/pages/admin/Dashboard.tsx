// src/pages/admin/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

interface Event {
  id: string;
  title: string;
  date: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalClasses: 0,
    scheduledClasses: 0,
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatsAndEvents = async () => {
      setLoading(true);

      // Simulate API calls for stats and events
      setTimeout(() => {
        setStats({
          totalRooms: 50,
          totalClasses: 30,
          scheduledClasses: 25,
        });

        setEvents([
          { id: '1', title: 'Math Conference', date: '2025-05-01' },
          { id: '2', title: 'Science Fair', date: '2025-05-10' },
        ]);

        setLoading(false);
      }, 1500);
    };

    fetchStatsAndEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>

      {/* Loading state */}
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          {/* Dashboard Stats */}
          <div className="dashboard-grid">
            {/* Card 1 */}
            <div className="card">
              <div className="card-title">Total Rooms</div>
              <div className="card-body">{stats.totalRooms}</div>
            </div>

            {/* Card 2 */}
            <div className="card">
              <div className="card-title">Total Classes</div>
              <div className="card-body">{stats.totalClasses}</div>
            </div>

            {/* Card 3 */}
            <div className="card">
              <div className="card-title">Scheduled Classes</div>
              <div className="card-body">{stats.scheduledClasses}</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="card">
            <h3 className="card-title">Upcoming Events</h3>
            <div className="card-body">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="event-item">
                    <strong>{event.title}</strong> - {event.date}
                  </div>
                ))
              ) : (
                <p>No upcoming events at the moment.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
