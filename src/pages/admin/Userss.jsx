import React from 'react';
import './Users.css';

const Users = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', image: 'https://via.placeholder.com/100' },
    ];

    return (
        <div className="users-container">
            {users.map(user => (
                <div className="user-card" key={user.id}>
                    <img src={user.image} alt={user.name} className="user-image" />
                    <div className="user-details">
                        <h3 className="user-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                        <div className="user-actions">
                            <button className="edit-button">Edit</button>
                            <button className="delete-button">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Users;
