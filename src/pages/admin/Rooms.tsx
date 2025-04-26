import React, { useState } from 'react';
import './rooms.css';

type RoomStatus = 'Ongoing' | 'Available';

type Room = {
  id: number;
  name: string;
  status: RoomStatus;
  time: string;
  professor: string;
  className: string;
};

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: 'Room 101',
      status: 'Ongoing',
      time: '08:00 - 09:30',
      professor: 'Dr. Alice Smith',
      className: 'Computer Science 101',
    },
    {
      id: 2,
      name: 'Room 102',
      status: 'Available',
      time: '',
      professor: '',
      className: '',
    },
  ]);

  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
  const [currentRoom, setCurrentRoom] = useState<Room>({
    id: 0,
    name: '',
    status: 'Available',
    time: '',
    professor: '',
    className: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open Add Modal
  const openAddModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalMode('Add');
      setCurrentRoom({
        id: 0,
        name: '',
        status: 'Available',
        time: '',
        professor: '',
        className: '',
      });
      setIsModalOpen(true);
    }, 100);
  };

  // Function to open Edit Modal
  const openEditModal = (room: Room) => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalMode('Edit');
      setCurrentRoom(room);
      setIsModalOpen(true);
    }, 100);
  };

  // Function to handle Save or Update
  const handleSave = () => {
    if (currentRoom.name.trim() === '') return;

    if (modalMode === 'Add') {
      const newRoom: Room = { ...currentRoom, id: Date.now() };
      setRooms((prevRooms) => [...prevRooms, newRoom]);
      setSuccessMessage('✅ Room added successfully!');
    } else {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === currentRoom.id ? currentRoom : room
        )
      );
      setSuccessMessage('✅ Room updated successfully!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Function to open delete confirmation modal
  const openDeleteModal = (roomId: number) => {
    setIsDeleteModalOpen(true);
    setCurrentRoom(rooms.find(room => room.id === roomId) || {
      id: 0,
      name: '',
      status: 'Available',
      time: '',
      professor: '',
      className: '',
    });
  };

  // Function to handle Delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== currentRoom.id));
      setSuccessMessage('🗑️ Room deleted successfully!');
      setIsDeleteModalOpen(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Filter rooms based on search input
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h2>📚 Manage Rooms</h2>

        <div className="rooms-actions">
          <input
            type="text"
            placeholder="🔍 Search room name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="add-btn" onClick={openAddModal}>
            ➕ Add Room
          </button>
        </div>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="rooms-grid">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-title">
                <h3>{room.name}</h3>
                <span
                  className={`status-badge ${room.status === 'Ongoing' ? 'ongoing' : 'available'}`}
                >
                  {room.status}
                </span>
              </div>

              {room.status === 'Ongoing' && (
                <div className="room-details">
                  <p>⏰ Time: {room.time}</p>
                  <p>👨‍🏫 Professor: {room.professor}</p>
                  <p>📘 Class: {room.className}</p>
                </div>
              )}

              <div className="room-actions">
                <button className="edit-btn" onClick={() => openEditModal(room)}>
                  ✏️ Edit
                </button>
                <button className="delete-btn" onClick={() => openDeleteModal(room.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No rooms found.</p>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="modal-backdrop show">
          <div className="modal">
            <span
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
              role="button"
              aria-label="Close Modal"
            >
              ❌
            </span>

            <h3>{modalMode === 'Add' ? 'Add New Room' : 'Edit Room'}</h3>

            <input
              type="text"
              placeholder="Room Name"
              value={currentRoom.name}
              onChange={(e) =>
                setCurrentRoom({ ...currentRoom, name: e.target.value })
              }
            />

            <select
              value={currentRoom.status}
              onChange={(e) =>
                setCurrentRoom({ ...currentRoom, status: e.target.value as RoomStatus })
              }
            >
              <option value="Available">Available</option>
              <option value="Ongoing">Ongoing</option>
            </select>

            {currentRoom.status === 'Ongoing' && (
              <>
                <input
                  type="text"
                  placeholder="Time (e.g., 08:00 - 09:30)"
                  value={currentRoom.time}
                  onChange={(e) =>
                    setCurrentRoom({ ...currentRoom, time: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Professor Name"
                  value={currentRoom.professor}
                  onChange={(e) =>
                    setCurrentRoom({ ...currentRoom, professor: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Class Name"
                  value={currentRoom.className}
                  onChange={(e) =>
                    setCurrentRoom({ ...currentRoom, className: e.target.value })
                  }
                />
              </>
            )}

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleSave}>
                ✅ {modalMode === 'Add' ? 'Add' : 'Save'}
              </button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-backdrop show">
          <div className="modal">
            <span
              className="modal-close"
              onClick={() => setIsDeleteModalOpen(false)}
              role="button"
              aria-label="Close Modal"
            >
              ❌
            </span>

            <h3>Are you sure you want to delete this room?</h3>
            <p>{currentRoom.name}</p>

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleDelete}>
                ✅ Yes, Delete
              </button>
              <button className="cancel-btn" onClick={() => setIsDeleteModalOpen(false)}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
