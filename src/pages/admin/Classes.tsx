// src/pages/admin/Classes.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import './Classes.css';

interface Class {
  id: string;
  name: string;
  instructor: string;
  description: string;
  schedule: string;
}

interface Enrollment {
  id: string;
  class_id: string;
  user_id: string;
}

const Classes = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'instructor'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    description: '',
    schedule: '',
  });

  const itemsPerPage = 4;

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Fetch classes + enrollments
  useEffect(() => {
    fetchClasses();
    fetchEnrollments();
    subscribeToChanges();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase.from('classes').select('*');
    if (error) console.error(error);
    else setClasses(data || []);
  };

  const fetchEnrollments = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id);
    if (error) console.error(error);
    else setEnrollments(data || []);
  };

  const subscribeToChanges = () => {
    supabase
      .channel('classes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'classes' }, () => {
        fetchClasses();
      })
      .subscribe();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterInstructor(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'instructor');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (mode: 'add' | 'edit', classItem?: Class) => {
    setModalMode(mode);
    if (classItem) {
      setFormData({
        name: classItem.name,
        instructor: classItem.instructor,
        description: classItem.description,
        schedule: classItem.schedule,
      });
      setSelectedClass(classItem);
    } else {
      setFormData({ name: '', instructor: '', description: '', schedule: '' });
      setSelectedClass(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClass = async () => {
    if (modalMode === 'add') {
      const { error } = await supabase.from('classes').insert([formData]);
      if (error) console.error(error);
    } else if (modalMode === 'edit' && selectedClass) {
      const { error } = await supabase
        .from('classes')
        .update(formData)
        .eq('id', selectedClass.id);
      if (error) console.error(error);
    }
    closeModal();
    fetchClasses();
  };

  const handleDeleteClass = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this class?');
    if (confirmDelete) {
      const { error } = await supabase.from('classes').delete().eq('id', id);
      if (error) console.error(error);
    }
  };

  const isEnrolled = (classId: string) => {
    return enrollments.some((enr) => enr.class_id === classId);
  };

  const toggleEnrollment = async (classId: string) => {
    if (!user) return;

    if (isEnrolled(classId)) {
      // Unenroll
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('class_id', classId)
        .eq('user_id', user.id);
      if (error) console.error(error);
    } else {
      // Enroll
      const { error } = await supabase.from('enrollments').insert([
        { class_id: classId, user_id: user.id },
      ]);
      if (error) console.error(error);
    }
    fetchEnrollments();
  };

  const filteredClasses = classes
    .filter((classItem) => {
      const matchesSearch =
        classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInstructor = filterInstructor ? classItem.instructor === filterInstructor : true;
      return matchesSearch && matchesInstructor;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.instructor.localeCompare(b.instructor);
    });

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const currentClasses = filteredClasses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Get unique instructor list for the filter
  const instructorsList = [...new Set(classes.map(c => c.instructor))];

  return (
    <main className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="page-title">Course Management</h1>
          <p className="page-subtitle">Manage your class catalog and enrollments</p>
        </div>
        <button className="primary-button add-class-btn" onClick={() => openModal('add')}>
          <span className="button-icon">+</span> Add New Class
        </button>
      </div>

      <div className="controls-container">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search classes..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="search-input" 
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Instructor:</label>
            <select onChange={handleFilterChange} className="filter-select">
              <option value="">All Instructors</option>
              {instructorsList.map(instructor => (
                <option key={instructor} value={instructor}>{instructor}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort by:</label>
            <select onChange={handleSortChange} className="filter-select">
              <option value="name">Class Name</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>No classes found</h3>
          <p>Try adjusting your search or filters, or add a new class</p>
        </div>
      ) : (
        <div className="class-grid">
          {currentClasses.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <div className="class-card-header">
                <h3 className="class-name">{classItem.name}</h3>
                <div className={`enrollment-badge ${isEnrolled(classItem.id) ? 'enrolled' : ''}`}>
                  {isEnrolled(classItem.id) ? 'Enrolled' : 'Not Enrolled'}
                </div>
              </div>
              
              <div className="class-details">
                <div className="detail-item">
                  <span className="detail-icon">👨‍🏫</span>
                  <span className="detail-text">{classItem.instructor}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🗓️</span>
                  <span className="detail-text">{classItem.schedule}</span>
                </div>
              </div>
              
              {classItem.description && (
                <p className="class-description">{classItem.description}</p>
              )}
              
              <div className="class-actions">
                <button 
                  className="action-button edit-button" 
                  onClick={() => openModal('edit', classItem)}
                >
                  Edit
                </button>
                <button 
                  className="action-button delete-button" 
                  onClick={() => handleDeleteClass(classItem.id)}
                >
                  Delete
                </button>
                <button 
                  className={`action-button ${isEnrolled(classItem.id) ? 'unenroll-button' : 'enroll-button'}`}
                  onClick={() => toggleEnrollment(classItem.id)}
                >
                  {isEnrolled(classItem.id) ? 'Unenroll' : 'Enroll'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-arrow" 
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <button 
            className="pagination-arrow" 
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{modalMode === 'add' ? 'Add New Class' : 'Edit Class'}</h2>
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Class Name</label>
                <input 
                  name="name" 
                  placeholder="Introduction to Programming" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Instructor</label>
                <input 
                  name="instructor" 
                  placeholder="Dr. Smith" 
                  value={formData.instructor} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Schedule</label>
                <input 
                  name="schedule" 
                  placeholder="Mon/Wed 2:00-3:30 PM" 
                  value={formData.schedule} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  name="description" 
                  placeholder="Enter a detailed description of the class..." 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="form-textarea"
                  rows={4} 
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button onClick={handleSaveClass} className="primary-button save-button">
                {modalMode === 'add' ? 'Create Class' : 'Update Class'}
              </button>
              <button onClick={closeModal} className="secondary-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Classes;