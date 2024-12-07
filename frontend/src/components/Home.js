import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import ChatList from './Chatlist';
import ChatMessages from './ChatMessages';

const ENDPOINTS = ["http://localhost:5000",
  "http://192.168.1.9:5000"
];


function App() {
  var socket = io(ENDPOINTS[0]);
  const [text, setText] = useState("");
  let [status, setStatus] = useState(false);
  const [groupId, setGroupId] = useState(null); //which group messages user is reading, that group's Id is here
  const [userId, setUserId] = useState(null); //which unknown user is the logged in user tried to communicate

  const groupClick = (id)=>{
    setUserId(null);
    setGroupId(id);
  }

  const userClick = (id)=>{
    setGroupId(null);
    setUserId(id);
  }

  useEffect(() => {
    socket.emit('setup', 'hello');
    setStatus(false);
  }, [status])

  const getInitials = (name) => {
    const nameArr = name.split(' ');
    return nameArr[0][0].toUpperCase();
  };

  useEffect(() => {
    socket.on('message-received', (message) => {
      setText(message.text);
    })
    if (!localStorage.getItem('token')){
      window.location.reload();
    }
  })

  return (
    <div className="App container-fluid px-0" style={{ marginTop: '76px', height: 'calc(100vh - 76px)' }}>

      <div className='messageGroup d-flex bg-light h-100'>

        <ChatList 
          groupClick={groupClick} userClick={userClick}
          groupId={groupId} setGroupId={setGroupId} 
          userId={userId} setUserId={setUserId}
          getInitials={getInitials} socket={socket}
        />

        <ChatMessages
          groupId={groupId} setGroupId={setGroupId} 
          userId={userId} setUserId={setUserId}
          getInitials={getInitials} socket={socket}
        />


        

      </div>

    </div>
  );
}

export default App;
