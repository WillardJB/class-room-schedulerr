// src/pages/admin/Rooms.tsx

import { useEffect, useState } from 'react';
import './Rooms.css';

interface Room {
  id: string;
  name: string;
  description: string;
  currentClass?: {
    subject?: string;
    professor: string;
    startTime: string;
    endTime: string;
    isOngoing: boolean;
  };
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState<Room>({
    id: '',
    name: '',
    description: '',
    currentClass: {
      professor: '',
      startTime: '',
      endTime: '',
      isOngoing: false,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchedRooms: Room[] = [
      {
        id: '1',
        name: 'Room A101',
        description: 'Lecture room with 30 seats.',
        currentClass: {
          subject: 'Computer Science 101',
          professor: 'Dr. Alice Smith',
          startTime: '08:00 AM',
          endTime: '09:30 AM',
          isOngoing: true,
        },
      },
      {
        id: '2',
        name: 'Room B205',
        description: 'Workshop room for practicals.',
        currentClass: {
          subject: 'Physics Lab',
          professor: 'Prof. Henry Lee',
          startTime: '10:00 AM',
          endTime: '11:30 AM',
          isOngoing: false,
        },
      },
      {
        id: '3',
        name: 'Room C301',
        description: 'Vacant meeting room.',
      },
    ];
    setRooms(fetchedRooms);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoom((prev) => {
      if (prev.currentClass) {
        return {
          ...prev,
          currentClass: { ...prev.currentClass, [name]: value },
        };
      } else {
        return {
          ...prev,
          currentClass: {
            professor: '',
            startTime: '',
            endTime: '',
            isOngoing: false,
            [name]: value,
          },
        };
      }
    });
  };

  const addRoom = () => {
    if (newRoom.name && newRoom.description) {
      setRooms([
        ...rooms,
        {
          ...newRoom,
          id: (rooms.length + 1).toString(),
        },
      ]);
      setNewRoom({
        id: '',
        name: '',
        description: '',
        currentClass: {
          professor: '',
          startTime: '',
          endTime: '',
          isOngoing: false,
        },
      });
      setIsModalOpen(false);
    }
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto relative">
        <h1 className="rooms-title">Rooms</h1>

        {/* Add Room Button */}
        <button className="add-room-button" onClick={() => setIsModalOpen(true)}>
          + Add Room
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Room</h2>
              <input
                type="text"
                name="name"
                placeholder="Room Name"
                value={newRoom.name}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Room Description"
                value={newRoom.description}
                onChange={handleInputChange}
              />
              {/* Ongoing Class Information */}
              <input
                type="text"
                name="professor"
                placeholder="Professor Name"
                value={newRoom.currentClass?.professor || ''}
                onChange={handleClassChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Class Name"
                value={newRoom.currentClass?.subject || ''}
                onChange={handleClassChange}
              />
              <input
                type="time"
                name="startTime"
                value={newRoom.currentClass?.startTime || ''}
                onChange={handleClassChange}
              />
              <input
                type="time"
                name="endTime"
                value={newRoom.currentClass?.endTime || ''}
                onChange={handleClassChange}
              />

              <div className="modal-footer">
                <button style={{ backgroundColor: '#4CAF50', color: 'white' }} onClick={addRoom}>
                  Add Room
                </button>
                <button
                  style={{ backgroundColor: '#e74c3c', color: 'white' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Room List */}
        <div className="room-list">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <h3>{room.name}</h3>
              <p>{room.description}</p>

              {room.currentClass ? (
                <div className="status-box">
                  <p>
                    🔴 <strong>Status:</strong>{' '}
                    {room.currentClass.isOngoing ? 'Ongoing' : 'Available'}
                  </p>
                  <p>
                    ⏰ <strong>Time:</strong> {room.currentClass.startTime} - {room.currentClass.endTime}
                  </p>
                  <p>
                    👨‍🏫 <strong>Professor:</strong> {room.currentClass.professor}
                  </p>
                  {room.currentClass.subject && (
                    <p>
                      📘 <strong>Class:</strong> {room.currentClass.subject}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-green-600 font-medium mt-4">✅ Available</p>
              )}

              <div className="room-actions">
                <button>View Details</button>
                <button onClick={() => deleteRoom(room.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rooms;
