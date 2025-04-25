import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RoomDetails {
  name: string;
  capacity: number;
  facilities: string[];
  description: string;
  availability: string;
}

const Room = () => {
  const { id } = useParams(); // Get the room ID from the URL
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch room details from API or mock data based on the `id`
      // Example: fetchRoomDetails(id);
      
      // Mock data
      const room = {
        name: `Room ${id}`,
        capacity: 20,
        facilities: ['Projector', 'Whiteboard', 'AC'],
        description: `This is a detailed description of Room ${id}.`,
        availability: 'Available',
      };

      setRoomDetails(room); // Set the room details
    }
  }, [id]);

  if (!roomDetails) {
    return <div>Loading...</div>; // Show loading while room details are fetched
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold text-blue-800 mb-6">
          {roomDetails.name} Details
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Room Information</h2>
          
          <p><strong>Capacity:</strong> {roomDetails.capacity} people</p>
          <p><strong>Facilities:</strong> {roomDetails.facilities.join(', ')}</p>
          <p><strong>Description:</strong> {roomDetails.description}</p>
          <p><strong>Availability:</strong> {roomDetails.availability}</p>

          {/* Booking button */}
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Book this Room
          </button>
        </div>
      </div>
    </main>
  );
};

export default Room;
