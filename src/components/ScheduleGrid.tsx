// src/components/ScheduleGrid.tsx
import { useRooms } from "../hooks/useRooms";  // Ensure it's imported correctly

const ScheduleGrid = () => {
  const { rooms } = useRooms(); // Should return rooms correctly

  // If rooms is empty or undefined, render a loading message
  if (!rooms || rooms.length === 0) {
    return <div>Loading...</div>;  // This will prevent the white screen if rooms are not loaded
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2 text-left">Time</th>
            {rooms.map((room) => (
              <th key={room.id} className="p-2 text-left">{room.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">08:00 - 09:00</td>
              {rooms.map((room) => (
                <td key={room.id} className="p-2">-</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleGrid;
