import { useState, useEffect } from 'react';
import './Users.css';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: 'Jese Leos',
        role: 'Administrator',
        email: 'jese@example.com',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Bonnie Green',
        role: 'Viewer',
        email: 'bonnie@example.com',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Leslie Livingston',
        role: 'Moderator',
        email: 'leslie@example.com',
        status: 'Inactive',
      },
      {
        id: 4,
        name: 'Micheal Gough',
        role: 'Moderator',
        email: 'micheal@example.com',

        status: 'Active',
      },
      {
        id: 5,
        name: 'Joseph McFall',
        role: 'Moderator',
        email: 'joseph@example.com',

        status: 'Active',
      },
    ]);
  }, []);

  return (
    <div className="users-container">
      <h2>All Users</h2>
      <div className="filters">
        <input type="text" placeholder="Search for users" />
        <select>
          <option>Role</option>
          <option>Administrator</option>
          <option>Viewer</option>
          <option>Moderator</option>
        </select>
        <select>
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>User Role</th>
            <th>Email</th>



            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.name}
              </td>
              <td>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>
              <td>{user.email}</td>

 
              <td>
                <span className={`status ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;