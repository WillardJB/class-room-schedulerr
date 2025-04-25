// src/pages/admin/Schedule.tsx
import  { useEffect, useState } from 'react';
import './Schedule.css';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
}

const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    // Fetch schedule data (you can replace this with an API call)
    const fetchedSchedule = [
      { id: '1', title: 'Math 101', time: '9:00 AM - 11:00 AM' },
      { id: '2', title: 'Science 202', time: '1:00 PM - 3:00 PM' },
    ];
    setSchedule(fetchedSchedule);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h1 className="schedule-title">Schedule</h1>

        <div className="schedule-container">
          {schedule.map((item) => (
            <div key={item.id} className="schedule-item">
              <h3>{item.title}</h3>
              <p>{item.time}</p>
              <div className="schedule-actions">
                <button>View Details</button>
                <button>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Schedule;
