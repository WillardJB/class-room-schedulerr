// src/pages/admin/Classes.tsx
import { useEffect, useState } from 'react';
import './Classes.css';

interface Class {
  id: string;
  name: string;
  instructor: string;
  description: string; // New property for class description
  schedule: string; // New property for class schedule
  enrolled: boolean;
}

const Classes = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'instructor'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [selectedClass, setSelectedClass] = useState<Class | null>(null); // State for selected class in modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    // Simulating fetching classes data (replace with actual API call)
    const fetchedClasses = [
      { id: '1', name: 'Math 101', instructor: 'John Doe', description: 'Basic Mathematics', schedule: 'Mon/Wed 10:00 - 12:00', enrolled: false },
      { id: '2', name: 'Science 202', instructor: 'Jane Smith', description: 'Intro to Physics', schedule: 'Tue/Thu 13:00 - 15:00', enrolled: false },
      { id: '3', name: 'History 303', instructor: 'John Doe', description: 'World History', schedule: 'Mon/Wed 14:00 - 16:00', enrolled: false },
      { id: '4', name: 'Art 404', instructor: 'Jane Smith', description: 'Painting and Drawing', schedule: 'Mon/Fri 09:00 - 11:00', enrolled: false },
      { id: '5', name: 'Physics 505', instructor: 'John Doe', description: 'Advanced Physics', schedule: 'Tue/Thu 16:00 - 18:00', enrolled: false },
    ];
    setClasses(fetchedClasses);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterInstructor(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'instructor');
  };

  const toggleEnrollment = (classId: string) => {
    setClasses(classes.map((classItem) =>
      classItem.id === classId ? { ...classItem, enrolled: !classItem.enrolled } : classItem
    ));
  };

  const filteredClasses = classes
    .filter((classItem) => {
      const matchesSearch =
        classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesInstructor = filterInstructor ? classItem.instructor === filterInstructor : true;
      
      return matchesSearch && matchesInstructor;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.instructor.localeCompare(b.instructor);
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const currentClasses = filteredClasses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h1 className="classes-title">Classes</h1>

        {/* Search Bar */}
        <div className="flex mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by class name or instructor"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select onChange={handleFilterChange} className="filter-select">
            <option value="">All Instructors</option>
            {classes
              .map((classItem) => classItem.instructor)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))}
          </select>

          <select onChange={handleSortChange} className="filter-select">
            <option value="name">Sort by Name</option>
            <option value="instructor">Sort by Instructor</option>
          </select>
        </div>

        <div className="class-list">
          {currentClasses.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <h3>{classItem.name}</h3>
              <p>Instructor: {classItem.instructor}</p>
              <div className="class-actions">
                <button onClick={() => openModal(classItem)}>View Details</button>
                <button onClick={() => toggleEnrollment(classItem.id)}>
                  {classItem.enrolled ? 'Unenroll' : 'Enroll'}
                </button>
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

        {/* Modal for Class Details */}
        {isModalOpen && selectedClass && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedClass.name}</h2>
              <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
              <p><strong>Description:</strong> {selectedClass.description}</p>
              <p><strong>Schedule:</strong> {selectedClass.schedule}</p>
              <button onClick={closeModal} className="close-modal-btn">Close</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Classes;
