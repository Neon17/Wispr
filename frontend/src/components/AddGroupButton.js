import React, { useState } from 'react';
import axios from 'axios';

const AddGroupButton = () => {
    // State to manage the fetched users, selected users, group name, and modal visibility
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true); // Controls modal visibility

    // Fetch users from the given API endpoint
    const fetchUsers = async () => {
        setIsFetching(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/v1/users/fetchAllUnknownUsers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status === 'success') {
                setUsers(response.data.data);
            } else {
                console.error('Failed to fetch users:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsFetching(false);
        }
    };

    // Handle selection of users (check/uncheck)
    const handleUserSelection = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId); // Deselect user
            } else {
                return [...prevSelected, userId]; // Select user
            }
        });
    };

    // Handle group creation by sending POST request with selected users
    const createGroup = async () => {
        if (!groupName || selectedUsers.length === 0) {
            alert('Please enter a group name and select at least one user');
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                name: groupName,
                id: selectedUsers,
            };
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/v1/users/addGroup', payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status === 'success') {
                alert('Group created successfully!');
                setGroupName('');
                setSelectedUsers([]);
                setIsModalOpen(false); // Close the modal after successful group creation
            } else {
                alert('Error creating group!');
            }
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Error creating group!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div>
                    <button onClick={fetchUsers} className="btn btn-primary mb-3" disabled={isFetching}>
                        {isFetching ? 'Fetching Users...' : 'Add Group'}
                    </button>

                    {isFetching && <p>Loading users...</p>}

                    {/* Render fetched users with checkboxes */}
                    {users.length > 0 && !isFetching && (
                        <div>
                            <div className="mb-3 z-depth-1">
                                <label htmlFor="groupName" className="form-label">
                                    Group Name
                                </label>
                                <input
                                    type="text"
                                    id="groupName"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </div>

                            <h5>Select Users to Add to Group</h5>
                            <div className="list-group">
                                {users.map((user) => (
                                    <div className="list-group-item" key={user._id}>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`user-${user._id}`}
                                                checked={selectedUsers.includes(user._id)}
                                                onChange={() => handleUserSelection(user._id)}
                                            />
                                            <label className="form-check-label" htmlFor={`user-${user._id}`}>
                                                {user.firstName} {user.lastName} ({user.username})
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="btn btn-success mt-3"
                                onClick={createGroup}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Group...' : 'Create Group'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Optionally add a fallback in case the modal is closed */}
            {!isModalOpen && (
                <div className="alert alert-success" role="alert">
                    Group created successfully! The modal is now closed.
                </div>
            )}
        </div>
    );
};

export default AddGroupButton;
