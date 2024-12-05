import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ENDPOINTS = ["http://localhost:5000",
  "http://192.168.1.9:5000"
];


function App() {
  const [axiosConfig] = useState({
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  var socket = io(ENDPOINTS[1]);
  const [text, setText] = useState("");
  const [messageText, setMessageText] = useState("");
  let [status, setStatus] = useState(false);
  let [joinChat, setJoinChat] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null); //which group messages user is reading, that group's Id is here
  const [userId, setUserId] = useState(null); //which unknown user is the logged in user tried to communicate
  const [messages,setMessages] = useState([]);

  const changeText = (event) => {
    setText(event.target.value);
  }

  const changeMessageText = (event)=>{
    setMessageText(event.target.value);
  }

  const groupClick = (id)=>{
    setUserId(null);
    console.log(`Clicked on group ${id}`);
    setGroupId(id);
    fetchMessages(id);
  }

  const userClick = (id)=>{
    setGroupId(null);
    setUserId(id);
    setMessages(null);
    setJoinChat(true);
  }

  const fetchMessages = (id)=>{
    axios.post("http://localhost:5000/api/v1/users/getAllMessages",{
      "groupId": id
    }, axiosConfig).then((res)=>{
      console.log(res.data);
      setMessages(res.data.data);
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  const startChat = (id)=>{
    //It create group with that User (like making friends on Facebook)
    axios.post("http://localhost:5000/api/v1/users/addGroup",{
      "id": id,
    }, axiosConfig).then((res)=>{
      console.log(res.data);
      fetchGroups();
      fetchUsers();
      setJoinChat(false);
      setUserId(null);
      setGroupId(res.data.data._id);
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  const sendGroupMessage = (id)=>{
    let temp = messageText;
    setMessageText(null);
    axios.post("http://localhost:5000/api/v1/users/sendMessage",{
      "groupId": id,
      "message": temp
    }, axiosConfig).then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  useEffect(() => {
    updateMessage();
    socket.emit('setup', 'hello');
    socket.on('message-received', updateMessage);
    setStatus(false);
  }, [status])

  const updateMessage = () => {
    fetch(`${ENDPOINTS[1]}/message.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        setText(json.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  const getInitials = (name) => {
    const nameArr = name.split(' ');
    return nameArr[0][0]
  };

  const chatRoomJoin = () => {
    let date = Date.now();
    localStorage.setItem('id', 12345);
    socket.emit('join chat', 12345);
    console.log('Chat Room Joined');
    setJoinChat(true);
    setStatus(true);
  }

  const triggerSocket = () => {
    updateMessage();
    socket.emit("button-clicked");
  }

  const sendMessage = () => {
    setStatus(true);
    let message = {
      id: 12345,
      text: text
    }
    socket.emit("new-message", message);
  }

  const fetchGroups = async () => {
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


  // socket.on('update-message',()=>{
  //   console.log('updating message');
  //   fetch('http://localhost:5000/message.txt')
  //   .then((response)=>{
  //     if (!response.ok) {
  //       throw new Error("HTTP error " + response.status);
  //     }
  //     return response.json();
  //   })
  //   .then(json => {
  //     setText(json.data);
  //   })
  //   .catch((err)=>{
  //     console.log(err.message);
  //   })  
  // })

  useEffect(() => {
    socket.on('message-received', (message) => {
      setText(message.text);
    })
  })
  useEffect(()=>{
    fetchGroups();
    fetchUsers();
  },[])

  return (
    <div className="App container-fluid px-0" style={{ marginTop: '76px', height: 'calc(100vh - 76px)' }}>

      <div className='messageGroup d-flex bg-light h-100'>

        <div className='border' style={{ width: '35%' }}>

          <div className='searchBoxContainer p-2 px-3 d-flex'>
            <input type="text" name="" id="" className="form-control rounded-0 rounded-start-2" placeholder="Search for User" aria-describedby="helpId" />
            <button type="button" className="btn btn-primary rounded-0 rounded-end-2" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

          </div>


          <h5 className='text-center m-3'>Groups and Friends</h5>
          {groups.map((group) => (
            <div
              key={group._id}
              className="personContainer border-top border-bottom p-3"
              style={(groupId==group._id)?{backgroundColor: "#d1d9ef"}:{}}
              onClick={function(){groupClick(group._id)}} // Handle click event
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
              style={(userId==user._id)?{backgroundColor: "#d1d9ef"}:{}}
              onClick={function(){userClick(user._id)}} // Handle click event
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


        <div className='border d-flex flex-column justify-content-between' style={{ width: '65%' }}>

          {(!groupId)&&(!userId)&&<div className='text-center m-5'>Click on the Group or User List to see messages</div>}
          <div className='container-fluid pt-2'>
            {messages && messages.map(message => (
              <div
                key={message._id}
                className={`d-flex align-items-center ${message.isUser ? 'flex-row-reverse' : ''}`}
              >
                <div className="position-relative me-3 ms-3">
                  <div
                    className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                    style={{ width: '50px', height: '50px', fontSize: '18px' }}
                  >
                    K
                  </div>
                  <span
                    className="position-absolute bottom-0 end-0 rounded-circle bg-success"
                    style={{ width: "12px", height: "12px", border: "2px solid #fff" }}
                  ></span>
                </div>

                <div className={`${message.isUser ? 'me-2' : 'ms-2'}`} style={{ maxWidth: "75%" }}>
                  <div
                    className={`p-3 rounded-3 bg-white shadow-sm ${message.isUser
                      ? 'rounded-top-end-0'
                      : 'rounded-top-start-0'
                      }`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <p className="mb-2 text-break" style={{ fontSize: "0.9rem" }}>{message.message}</p>
                    <div className={`d-flex align-items-center gap-2 ${message.isUser ? 'justify-content-end' : ''}`}>
                      <small className="text-muted" style={{ fontSize: "0.75rem" }}>{message.dateTime}</small>
                      {message.isUser && (
                        <div className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                          style={{ width: "16px", height: "16px" }}>
                          <div className="rounded-circle bg-white"
                            style={{ width: "8px", height: "8px" }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                  {!message.isUser && (
                    <div className="mt-1 ms-2">
                      <small className="text-muted fw-medium">{message.senderId.firstName}</small>
                    </div>
                  )}
                </div>
              </div>
            ))}

            { (!messages) && (joinChat) && 
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="button"
                aria-pressed="false"
                autoComplete="off"
                onClick={()=>{startChat(userId)}}
              >
                Start Chat
              </button>
              
            }

            { (!messages) && (!joinChat) && 
              <div className='text-center m-5'>Start messaging to see messages here</div>              
            }

          </div>


          {/* --------------------------------- */}
          {/* 
          <div className='d-flex'>
            <button
              type="button"
              className="btn btn-primary m-1"
              data-bs-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={triggerSocket}
            >
              Trigger Socket
            </button>


            {!joinChat &&
              <button type="button" className="btn btn-primary m-1" onClick={chatRoomJoin} data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                Join Chat
              </button>
            }
          </div>

          {joinChat &&
            <>
              <div className="mb-3">
                <label htmlFor="" className="form-label"></label>
                <textarea className="form-control" name="" id="" rows="20" value={text} onChange={changeText}></textarea>
              </div>
              <button type="button" onClick={sendMessage} className="btn btn-primary" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                Send
              </button>
            </>
          } */}

          {/* --------------------------------- */}


          <div className='typeContainer p-2 w-100 d-flex'>
            <div className="mb-3 flex-grow-1">
              <input
                type="text"
                name=""
                id=""
                className="border form-control rounded-0 rounded-start"
                style={{ backgroundColor: '#FFF' }}
                value={messageText}
                onChange={changeMessageText}
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div className='buttonContainer'>
              <button type="button" onClick={()=>sendGroupMessage(groupId)} className="btn btn-primary rounded-0 rounded-end" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
