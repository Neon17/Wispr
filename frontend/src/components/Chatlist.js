import React, { useEffect, useState } from 'react';
import axios from 'axios';
// karne ho yo onclickma userid dechu tyo bata gara yesko lagi
const clickGroup = ()=>{
    console.log('Chat Group Clicked!');
}
const ChatList = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  // Extract initials from a full name
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase();
  };

  const fetchGroups = async ()=>{
    try {
      const token = localStorage.getItem('token'); // Extract token from localStorage
      const response = await axios.get('http://localhost:5000/api/v1/users/showAllGroupList', {
        headers: {
          Authorization: `Bearer ${token}`, // Set Authorization header
        },
      });

      if (response.data.status === 'success') {
        setGroups(response.data.data); // Save user data to state
      } else {
        console.error('Failed to fetch users:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Extract token from localStorage
      const response = await axios.get('http://localhost:5000/api/v1/users/fetchAllUnknownUsers', {
        headers: {
          Authorization: `Bearer ${token}`, // Set Authorization header
        },
      });

      if (response.data.status === 'success') {
        setUsers(response.data.data); // Save user data to state
      } else {
        console.error('Failed to fetch users:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  // Render user list
  return (
    <div>

      <h5 className='text-center m-3'>Groups and Friends</h5>
      {groups.map((group) => (
        <div
          key={group._id}
          className="personContainer border-top border-bottom p-3"
          onClick={() => console.log(`Clicked on group ${group._id}`)} // Handle click event
          role="button"
        >
          {/* Profile Name */}
          <div className="d-flex align-items-center">
            {/* Avatar with initials */}
            <div
              className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
              style={{ width: '50px', height: '50px', fontSize: '18px' }}
            >
              {getInitials(`${group.name}`)}
            </div>

            {/* Name and message */}
            <div className="ms-3">
              {/* Person Name */}
              <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                {group.name}
              </div>
              {/* Placeholder for last message */}
              <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                Last message placeholder
              </div>
            </div>
          </div>

          {/* Time */}
          <div
            className="personTime form-text text-muted text-end"
            style={{ fontSize: '12px' }}
          >
            {/* Placeholder for message time */}
            07:08 AM
          </div>
        </div>
      ))}

      <h5 className='text-center m-3'>New Peoples</h5>
      {users.map((user) => (
        <div
          key={user._id}
          className="personContainer border-top border-bottom p-3"
          onClick={() => console.log(`Clicked on user ${user._id}`)} // Handle click event
          role="button"
        >
          {/* Profile Name */}
          <div className="d-flex align-items-center">
            {/* Avatar with initials */}
            <div
              className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
              style={{ width: '50px', height: '50px', fontSize: '18px' }}
            >
              {getInitials(`${user.firstName} ${user.lastName}`)}
            </div>

            {/* Name and message */}
            <div className="ms-3">
              {/* Person Name */}
              <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                {user.firstName} {user.lastName}
              </div>
              {/* Placeholder for last message */}
              <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                Last message placeholder
              </div>
            </div>
          </div>

          {/* Time */}
          <div
            className="personTime form-text text-muted text-end"
            style={{ fontSize: '12px' }}
          >
            {/* Placeholder for message time */}
            07:08 AM
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
