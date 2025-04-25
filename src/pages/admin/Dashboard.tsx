// src/pages/admin/Dashboard.tsx
import './Dashboard.css';  // Import custom CSS for the dashboard

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>

      {/* Dashboard Stats */}
      <div className="dashboard-grid">
        {/* Card 1 */}
        <div className="card">
          <div className="card-title">Total Rooms</div>
          <div className="card-body">50</div>
        </div>

        {/* Card 2 */}
        <div className="card">
          <div className="card-title">Total Classes</div>
          <div className="card-body">30</div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div className="card-title">Scheduled Classes</div>
          <div className="card-body">25</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="card">
        <h3 className="card-title">Upcoming Events</h3>
        <div className="card-body">
          <p>No upcoming events at the moment.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
