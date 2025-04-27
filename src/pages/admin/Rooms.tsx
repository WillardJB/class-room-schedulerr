import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // adjust the path if needed
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
  const [rooms, setRooms] = useState<Room[]>([]);
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
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:30');

  // Fetch rooms from Supabase
  const fetchRooms = async () => {
    const { data, error } = await supabase.from('rooms').select('*');
    if (error) {
      console.error('Error fetching rooms:', error.message);
    } else {
      const mappedRooms = data.map((room) => ({
        id: room.id,
        name: room.name || '',
        status: (room.status as RoomStatus) || 'Available',
        time: room.time || '',
        professor: room.professor || '',
        className: room.class_name || '',
      }));
      setRooms(mappedRooms);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const updateTimeField = () => {
    const newTime = `${startTime} - ${endTime}`;
    setCurrentRoom((prev) => ({ ...prev, time: newTime }));
  };

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
      setStartTime('08:00');
      setEndTime('09:30');
      setIsModalOpen(true);
    }, 100);
  };

  const openEditModal = (room: Room) => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalMode('Edit');
      setCurrentRoom(room);

      const [start, end] = room.time.split(' - ');
      if (start && end) {
        setStartTime(start);
        setEndTime(end);
      } else {
        setStartTime('08:00');
        setEndTime('09:30');
      }
      setIsModalOpen(true);
    }, 100);
  };

  const handleSave = async () => {
    updateTimeField();
    if (currentRoom.name.trim() === '') return;

    if (modalMode === 'Add') {
      const {  error } = await supabase.from('rooms').insert([
        {
          name: currentRoom.name,
          status: currentRoom.status,
          time: `${startTime} - ${endTime}`,
          professor: currentRoom.professor,
          class_name: currentRoom.className,
        },
      ]);

      if (error) {
        console.error('Error adding room:', error.message);
      } else {
        setSuccessMessage('✅ Room added successfully!');
        fetchRooms();
      }
    } else {
      const {  error } = await supabase.from('rooms').update({
        name: currentRoom.name,
        status: currentRoom.status,
        time: `${startTime} - ${endTime}`,
        professor: currentRoom.professor,
        class_name: currentRoom.className,
      }).eq('id', currentRoom.id);

      if (error) {
        console.error('Error updating room:', error.message);
      } else {
        setSuccessMessage('✅ Room updated successfully!');
        fetchRooms();
      }
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const openDeleteModal = (roomId: number) => {
    setIsDeleteModalOpen(true);
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('rooms').delete().eq('id', currentRoom.id);

    if (error) {
      console.error('Error deleting room:', error.message);
    } else {
      setSuccessMessage('🗑️ Room deleted successfully!');
      fetchRooms();
    }

    setIsDeleteModalOpen(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

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
                <span className={`status-badge ${room.status === 'Ongoing' ? 'ongoing' : 'available'}`}>
                  {room.status}
                </span>
              </div>

              <div className="room-details">
                <p>⏰ Time: {room.time || 'N/A'}</p>
                <p>👨‍🏫 Professor: {room.professor || 'N/A'}</p>
                <p>📘 Class: {room.className || 'N/A'}</p>
              </div>

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
              onChange={(e) => setCurrentRoom({ ...currentRoom, name: e.target.value })}
            />

            <div className="time-picker-row">
              <div className="time-input">
                <label>Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="time-input">
                <label>End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Professor Name"
              value={currentRoom.professor}
              onChange={(e) => setCurrentRoom({ ...currentRoom, professor: e.target.value })}
            />

            <input
              type="text"
              placeholder="Class Name"
              value={currentRoom.className}
              onChange={(e) => setCurrentRoom({ ...currentRoom, className: e.target.value })}
            />

            <select
              value={currentRoom.status}
              onChange={(e) => setCurrentRoom({ ...currentRoom, status: e.target.value as RoomStatus })}
            >
              <option value="Available">Available</option>
              <option value="Ongoing">Ongoing</option>
            </select>

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
