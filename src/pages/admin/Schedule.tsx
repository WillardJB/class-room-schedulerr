// src/pages/admin/Schedule.tsx
import { useEffect, useState } from 'react';
import './Schedule.css';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  instructor: string;
}

const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [sortByTime, setSortByTime] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedClass, setSelectedClass] = useState<ScheduleItem | null>(null); // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    // Fetching the schedule data (replace with an actual API call)
    const fetchedSchedule = [
      { id: '1', title: 'Math 101', time: '9:00 AM - 11:00 AM', instructor: 'John Doe' },
      { id: '2', title: 'Science 202', time: '1:00 PM - 3:00 PM', instructor: 'Jane Smith' },
      { id: '3', title: 'History 303', time: '11:00 AM - 1:00 PM', instructor: 'Mary Johnson' },
      { id: '4', title: 'Art 404', time: '2:00 PM - 4:00 PM', instructor: 'James Brown' },
      { id: '5', title: 'Physics 505', time: '9:00 AM - 11:00 AM', instructor: 'Alice Cooper' },
    ];
    setSchedule(fetchedSchedule);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTime(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByTime(e.target.value as 'asc' | 'desc');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (classItem: ScheduleItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredSchedule = schedule
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTimeFilter =
        filterTime === '' || item.time.toLowerCase().includes(filterTime.toLowerCase());
      return matchesSearch && matchesTimeFilter;
    })
    .sort((a, b) => {
      const aTime = new Date(`1970-01-01T${a.time.split(' - ')[0]}:00`);
      const bTime = new Date(`1970-01-01T${b.time.split(' - ')[0]}:00`);
      return sortByTime === 'asc' ? aTime.getTime() - bTime.getTime() : bTime.getTime() - aTime.getTime();
    });

  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);
  const currentSchedule = filteredSchedule.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h1 className="schedule-title">Schedule</h1>

        {/* Search Bar */}
        <div className="flex mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by class name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select onChange={handleFilterTimeChange} className="filter-select">
            <option value="">Filter by Time</option>
            <option value="AM">Morning</option>
            <option value="PM">Afternoon</option>
          </select>
          <select onChange={handleSortChange} className="filter-select">
            <option value="asc">Sort by Time (Ascending)</option>
            <option value="desc">Sort by Time (Descending)</option>
          </select>
        </div>

        <div className="schedule-container">
          {currentSchedule.map((item) => (
            <div key={item.id} className="schedule-item">
              <h3>{item.title}</h3>
              <p>{item.time}</p>
              <p>Instructor: {item.instructor}</p>
              <div className="schedule-actions">
                <button onClick={() => openModal(item)}>View Details</button>
                <button>Book</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Modal for Class Booking */}
        {isModalOpen && selectedClass && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedClass.title}</h2>
              <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
              <p><strong>Time:</strong> {selectedClass.time}</p>
              <p>Do you want to book this class?</p>
              <button onClick={closeModal} className="close-modal-btn">Close</button>
              <button onClick={() => alert('Booking confirmed!')} className="book-modal-btn">
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Schedule;
