import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, InputGroup, Button } from 'react-bootstrap';
import AddGroupButton from './AddGroupButton';

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
    props.socket.on('new-message-received', (message) => {
      if ((message!=undefined)||(message!=null)){
        if (!status)
          setStatus(true);
      }
    });
  })

  useEffect(() => {
    fetchUsers();
    fetchGroups();
    setStatus(false);
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
          // console.log('Groups:', response.data.data);
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

    <div className="p-2 d-flex flex-column  mt-5 border bg-white rounded-3 shadow-sm ms-3" style={{ height:"81vh" }}>
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
     
      {/* setStatus = true updates the groups and messages */}
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
           <AddGroupButton setStatus = {setStatus}/> 
          {Array.isArray(users) && users.map((user) => (
            <div
              key={user._id}
              className={` mb-3 rounded-4 ${props.userId === user._id ? 'bg-light' : 'hover-bg-light'}`}
              onClick={() => {
                alert('User Clicked');
                props.userClick(user._id)}
              }
              role="button"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '90px',
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
                <style>
                  {`
                  .avatar-circle {
 
   
    background: linear-gradient(45deg, #0d6efd, #0dcaf0);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
  }

  .avatar-circle:hover {
    transform: scale(0.1);
  }
                  `}
                </style>
                {/* Profile Picture */}
                <div
                  className="avatar-circle rounded-circle bg-primary text-white d-flex justify-content-center align-items-center shadow-sm"
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
      <div className="px-1" style={{ height: '55vh', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
          .px-1::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>


     {/* Chat Groups Section */}
     <h6 className="text-muted m-1 text-center pt-3 pb-2 text-uppercase" style={{ fontSize: '14px', letterSpacing: '1px', fontWeight: '500' }}>
      Chat Groups
    </h6>
    {(groups != null) && groups.groups && groups.groups.length === 0 ? (
      <div className='text-center m-5'>No Groups Available</div>
    ) : (
      <div>
        {(groups != null) && groups.groups && groups.groups.map((group, index) => (
          <div
            key={group._id}
            className={`rounded-4 mb-3 p-3 d-flex align-items-center justify-content-between hover-shadow bg-white border-0`}
            onClick={() => chatRoomJoin(group._id)}
            role="button"
            style={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="d-flex align-items-center">
              <div
                className="avatar-circle rounded-circle bg-primary text-white d-flex justify-content-center align-items-center shadow-sm me-3"
                style={{
                  width: '50px',
                  height: '50px',
                  fontSize: '22px',
                  fontWeight: 'bold',
                }}
              >
                {props.getInitials(group.name)}
              </div>
              <div>
                <span className="fw-bold text-dark">{group.name}</span>
                <div className="text-muted text-truncate" style={{ fontSize: '12px', color: '#555' }}>
                  {groups && groups.latestMessages[index] && groups.latestMessages[index].message}
                  {groups && !groups.latestMessages[index] && <>Click to start a new chat</>}
                </div>
              </div>
            </div>
            <div>
              <i className="fas fa-chevron-right text-muted" style={{ fontSize: '18px' }}></i>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default ChatList;
