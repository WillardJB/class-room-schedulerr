// src/pages/Book.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Book = () => {
  // Use state to manage booking details
  const [room, setRoom] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [name, setName] = useState<string>('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the booking process here (you can add API calls or other logic)
    console.log('Booking details:', { room, time, date, name });

    // After submitting, navigate to a confirmation page or back to Home
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold text-blue-800 mb-6">
          Book a Room
        </h1>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="room" className="block text-left text-sm font-medium text-gray-700">
              Select Room
            </label>
            <select
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Choose a room</option>
              <option value="Room A">Room A</option>
              <option value="Room B">Room B</option>
              <option value="Room C">Room C</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="time" className="block text-left text-sm font-medium text-gray-700">
              Select Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Choose a time</option>
              <option value="09:00 - 10:00">09:00 - 10:00</option>
              <option value="10:00 - 11:00">10:00 - 11:00</option>
              <option value="11:00 - 12:00">11:00 - 12:00</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="date" className="block text-left text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
            Book Room
          </button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Want to check available rooms? <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Book;
