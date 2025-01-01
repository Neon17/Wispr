import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const AddGroupButton = (props) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
                setShowModal(true);
            } else {
                console.error('Failed to fetch users:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleUserSelection = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            }
            return [...prevSelected, userId];
        });
    };

    const createGroup = async () => {
        if (!groupName.trim()) {
            alert('Please enter a group name');
            return;
        }
        if (selectedUsers.length === 0) {
            alert('Please select at least one user');
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/v1/users/addGroup',
                {
                    name: groupName,
                    id: selectedUsers,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status === 'success') {
                props.setStatus(true);
                handleClose();
                alert('Group created successfully!');
            }
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Error creating group. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setGroupName('');
        setSelectedUsers([]);
    };

    return (
        <>
            {/* Add Group Button */}
            <div className="d-flex flex-column align-items-center">
                <style>
                    {`
                        .btn:hover:not(:disabled) {
                        transform: translateY(-2px);
                         }
    `}
                </style>
                <button
                    onClick={fetchUsers}
                    className="btn rounded-circle d-flex flex-column align-items-center justify-content-center bg-primary text-white shadow-sm"
                    style={{
                        width: '60px',
                        height: '60px',
                        transition: 'transform 0.2s'
                    }}
                    disabled={isFetching}
                >
                    {isFetching ? (
                        <span className="spinner-border spinner-border-sm" />
                    ) : (
                        <i className="fas fa-plus fa-lg" />
                    )}
                </button>
                <span className="mt-2 text-muted small">Add Group</span>
            </div>

            {/* Modal */}
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>Create New Group</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="mb-4">
                        <label htmlFor="groupName" className="form-label fw-bold">
                            Group Name
                        </label>
                        <input
                            type="text"
                            id="groupName"
                            className="form-control form-control-lg"
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <h6 className="fw-bold mb-3">Select Members</h6>
                        <div className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {users.map((user) => (
                                <div
                                    key={user._id}
                                    className="list-group-item list-group-item-action d-flex align-items-center p-3"
                                    onClick={() => handleUserSelection(user._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="form-check flex-grow-1">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`user-${user._id}`}
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => {}}
                                        />
                                        <label
                                            className="form-check-label ms-2"
                                            htmlFor={`user-${user._id}`}
                                        >
                                            <div className="fw-semibold">{`${user.firstName} ${user.lastName}`}</div>
                                            <small className="text-muted">@{user.username}</small>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <button
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={createGroup}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Creating Group...
                            </>
                        ) : (
                            'Create Group'
                        )}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddGroupButton;