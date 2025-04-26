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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'Viewer',
    status: 'Active',
  });
  const [editUser, setEditUser] = useState<User | null>(null); // New state for editing user
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchedUsers: User[] = [
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
    ];
    setUsers(fetchedUsers);
    setFilteredUsers(fetchedUsers);
  }, []);

  const handleAddUser = () => {
    const newId = users.length + 1;
    const updatedUsers = [...users, { id: newId, ...newUser }];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setNewUser({ name: '', email: '', role: 'Viewer', status: 'Active' });
    setIsModalOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleUpdateUser = () => {
    if (editUser) {
      const updatedUsers = users.map((user) =>
        user.id === editUser.id ? { ...editUser, ...newUser } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setIsModalOpen(false);
      setEditUser(null); // Clear the edit state
      setNewUser({ name: '', email: '', role: 'Viewer', status: 'Active' });
    }
  };

  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(query, selectedRole, selectedStatus);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    filterUsers(searchQuery, role, selectedStatus);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    filterUsers(searchQuery, selectedRole, status);
  };

  const filterUsers = (search: string, role: string, status: string) => {
    const filtered: User[] = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = role ? user.role === role : true;
      const matchesStatus = status ? user.status === status : true;
      return matchesSearch && matchesRole && matchesStatus;
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>All Users</h2>
        <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>
          + Add New User
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search for users"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select value={selectedRole} onChange={(e) => handleRoleFilter(e.target.value)}>
          <option value="">Role</option>
          <option value="Administrator">Administrator</option>
          <option value="Viewer">Viewer</option>
          <option value="Moderator">Moderator</option>
        </select>
        <select value={selectedStatus} onChange={(e) => handleStatusFilter(e.target.value)}>
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
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
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
              </td>
              <td>{user.email}</td>
              <td>
                <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEditUser(user)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editUser ? 'Edit User' : 'Add New User'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="Administrator">Administrator</option>
              <option value="Moderator">Moderator</option>
              <option value="Viewer">Viewer</option>
            </select>
            <select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value as 'Active' | 'Inactive' })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="modal-actions">
              <button onClick={editUser ? handleUpdateUser : handleAddUser}>
                {editUser ? 'Update User' : 'Add User'}
              </button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
