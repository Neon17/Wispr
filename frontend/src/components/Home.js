import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatList from './Chatlist';
import ChatMessages from './ChatMessages';

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
  let [status, setStatus] = useState(false);
  const [groupId, setGroupId] = useState(null); //which group messages user is reading, that group's Id is here
  const [userId, setUserId] = useState(null); //which unknown user is the logged in user tried to communicate

  const groupClick = (id)=>{
    setUserId(null);
    console.log(`Clicked on group ${id}`);
    setGroupId(id);
  }

  const userClick = (id)=>{
    setGroupId(null);
    setUserId(id);
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

  return (
    <div className="App container-fluid px-0" style={{ marginTop: '76px', height: 'calc(100vh - 76px)' }}>

      <div className='messageGroup d-flex bg-light h-100'>

        <ChatList 
          groupClick={groupClick} userClick={userClick}
          groupId={groupId} setGroupId={setGroupId} 
          userId={userId} setUserId={setUserId}
          getInitials={getInitials} 
        />

        <ChatMessages
          groupId={groupId} setGroupId={setGroupId} 
          userId={userId} setUserId={setUserId}
          getInitials={getInitials}
        />


        

      </div>

    </div>
  );
}

export default App;
