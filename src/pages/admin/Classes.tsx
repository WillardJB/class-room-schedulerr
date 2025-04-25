// src/pages/admin/Classes.tsx
import  { useEffect, useState } from 'react';
import './Classes.css';

interface Class {
  id: string;
  name: string;
  instructor: string;
}

const Classes = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    // Fetch the classes data (you can replace this with an API call)
    const fetchedClasses = [
      { id: '1', name: 'Math 101', instructor: 'John Doe' },
      { id: '2', name: 'Science 202', instructor: 'Jane Smith' },
    ];
    setClasses(fetchedClasses);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h1 className="classes-title">Classes</h1>

        <div className="class-list">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <h3>{classItem.name}</h3>
              <p>Instructor: {classItem.instructor}</p>
              <div className="class-actions">
                <button>View Details</button>
                <button>Enroll</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Classes;
