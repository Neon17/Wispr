import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, InputGroup, Button } from 'react-bootstrap';

const ChatList = (props) => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState(null);
  const [status, setStatus] = useState(null);

  const chatRoomJoin = (id) => {
    props.groupClick(id);
    props.socket.emit('join chat', id);
    console.log('Chat Room Joined');
  }

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, [props.groupId, props.userId]);

  useEffect(() => {
    props.socket.on('new-message-received', () => {
      setStatus(true);
    });
  })

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, [status])

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token'); // Extract token from localStorage
      axios.get('http://localhost:5000/api/v1/users/showAllGroupList', {
        headers: {
          Authorization: `Bearer ${token}`, // Set Authorization header
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          setGroups(response.data.data); // Save user data to state
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      }).catch(error => {
        console.error('Error fetching users:', error);
      })
    }
    catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Fetch users from API
  const fetchUsers = async () => {
    const token = localStorage.getItem('token'); // Extract token from localStorage
    await axios.get('http://localhost:5000/api/v1/users/fetchAllUnknownUsers', {
      headers: {
        Authorization: `Bearer ${token}`, // Set Authorization header
      },
    }).then((response)=>{
      if (response.data.status === 'success') {
        setUsers(response.data.data); // Save user data to state
      } else {
        console.error('Failed to fetch users:', response.data.message);
      }
    }).catch((error)=>{
      console.error('Error fetching users:', error);
    })
  };

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  // Render user list
  return (

    <div className="border bg-white rounded-3 shadow-sm ms-3" style={{ width: '35%', height: '90vh', maxWidth: '600px' }}>
      {/* Search Box */}
      <div className="position-sticky top-0 bg-white rounded-top-3" style={{ zIndex: 1020 }}>
        <div className="p-3">
          <InputGroup>
            <Form.Control
              placeholder="Search for a User"
              className="border-end-0 text-center rounded-pill shadow-none"
            />
            <Button variant="primary" className="ms-1 border-start-0  rounded-pill">
              <i className="fa-solid fa-magnifying-glass text-light"></i>
            </Button>
          </InputGroup>
        </div>
      </div>
      {/* Users Section */}
   <div className="d-flex align-items-center justify-content-center pt-3 pb-2 border-top">
    <div className="pr-2">
      <i className="fas fa-users text-primary" style={{ fontSize: '20px' }}></i>
    </div>
    <div>
      <h6
        className="text-muted text-center text-uppercase"
        style={{
          fontSize: '13px',
          letterSpacing: '0.5px',
          fontWeight: 'bold',
        }}
      >
        Users You Haven't Chatted With
      </h6>
    </div>
  </div>
      
      {users && users.length === 0 ? (
        <div className="text-center m-5">No Users Available</div>
        
      ) : (
        <div
          className="mb-0 overflow-x-auto d-flex flex-nowrap"
          style={{
            padding: '0 1px', // Reduced padding
            scrollbarWidth: 'none', // Hide scrollbar for modern browsers
            WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
          }}
        >
          {Array.isArray(users) && users.map((user) => (
            <div
              key={user._id}
              className={` mb-3 rounded-4 ${props.userId === user._id ? 'bg-light' : 'hover-bg-light'}`}
              onClick={() => props.userClick(user._id)}
              role="button"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '120px',
                maxWidth: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px', // More consistent padding
              }}
            >
              {/* Online Status */}
              <div
                className="position-relative"
                style={{
                  width: '60px',
                  height: '60px',
                  marginBottom: '8px',
                }}
              >
                <div
                  className="position-absolute bg-success rounded-circle border border-2 border-white"
                  style={{
                    width: '15px',
                    height: '15px',
                    top: '0',
                    left: '45px',
                    zIndex: 1,
                  }}
                />
                {/* Profile Picture */}
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center shadow-sm"
                  style={{
                    width: '60px',
                    height: '60px',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    marginBottom: '6px', // Reduced margin for better compactness
                  }}
                >
                  {props.getInitials(`${user.firstName} ${user.lastName}`)}
                </div>
              </div>

              {/* User Info */}
              <div className="text-center flex-grow-1" style={{ padding: '0 8px' }}>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <span className="fw-bold" style={{ fontSize: '14px', color: '#333' }}>
                    {user.firstName} {user.middleName} {user.lastName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="px-1" style={{ height: 'calc(65vh - 2px)', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
          .px-1::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>


        {/* Groups Section */}
        <h6 className="text-muted text-center pt-3 pb-2 text-uppercase" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
          Chat
        </h6>
        {(groups!=null) && groups.groups && groups.groups.length === 0 ?
          (<div className='text-center m-5'>No Groups Available</div>) :



          (<div className="mb-4">
            {(groups!=null) && groups.groups && groups.groups.map((group, index) => (
              <div
                key={group._id}
                className={`mx-4 mb-3 rounded-4 ${props.groupId === group._id ? 'bg-light' : 'hover-bg-light'}`}
                onClick={() => chatRoomJoin(group._id)}
                role="button"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="position-relative d-flex align-items-center p-3">
                  {/* Online Status */}
                  <div
                    className="position-absolute bg-success rounded-circle border border-2 border-white"
                    style={{ width: '15px', height: '15px', top: '20px', left: '60px', zIndex: 1 }}
                  />

                  {/* Profile Picture */}
                  <div
                    className="rounded-circle bg-primary  text-white d-flex justify-content-center align-items-center shadow-sm"
                    style={{ width: '60px', height: '60px', fontSize: '22px', fontWeight: 'bold' }}
                  >
                    {props.getInitials(`${group.name}`)}
                  </div>

                  <div className="ms-3 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold" style={{ fontSize: '18px', color: '#333', letterSpacing: '0.5px' }}>
                        {group.name}
                      </span>
                      <small className="text-muted" style={{ fontSize: '12px', opacity: 0.7 }}>
                        {groups && groups.latestMessages[index] && groups.latestMessages[index].dateTime.substr(11,5)}
                      </small>
                    </div>
                    <div className="text-muted text-truncate" style={{ fontSize: '13px', color: '#555' }}>
                      <small className="d-block" style={{ fontStyle: 'italic', color: '#888' }}>
                        {groups && groups.latestMessages[index] && groups.latestMessages[index].message}
                        {groups && !groups.latestMessages[index] && <>Click to start a new chat</>}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>)
        }



      </div>
    </div>

  );
};

export default ChatList;
