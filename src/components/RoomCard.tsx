// src/components/RoomCard.tsx

import { Link } from 'react-router-dom';

const RoomCard = ({ room }: { room: { id: number, name: string, capacity: number } }) => {
  return (
    <div className="card bg-blue-100 shadow-md hover:shadow-lg transition p-6">
      <h3 className="text-xl font-semibold">{room.name}</h3>
      <p className="text-sm text-gray-700 mb-4">{room.capacity} people</p>
      <Link to={`/room/${room.id}`} className="btn btn-primary w-full">View Room</Link>
    </div>
  );
};

export default RoomCard;
