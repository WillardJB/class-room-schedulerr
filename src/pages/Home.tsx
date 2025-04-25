// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Available Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Room Card Example */}
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold">Room 101</h2>
          <p className="text-gray-600">Capacity: 20 people</p>
          <Link to="/room/101" className="text-blue-600 hover:underline">View Details</Link>
        </div>

        {/* Add more rooms as needed */}
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold">Room 102</h2>
          <p className="text-gray-600">Capacity: 30 people</p>
          <Link to="/room/102" className="text-blue-600 hover:underline">View Details</Link>
        </div>

        {/* Continue adding room cards */}
      </div>
    </div>
  );
};

export default Home;
