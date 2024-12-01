import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const ENDPOINTS = ["http://localhost:5000",
  "http://192.168.1.9:5000"
];

function App() {
  var socket = io(ENDPOINTS[1]);
  const [text,setText] = useState("");
  let [status, setStatus] = useState(false);
  let [joinChat, setJoinChat] = useState(false);

  const changeText = (event)=>{
    setText(event.target.value);
  }

  useEffect(()=>{
    updateMessage();
    socket.emit('setup','hello');  
    socket.on('message-received',updateMessage); 
    setStatus(false);
  },[status])

  useEffect(()=>{
    socket.on('message-received', (message)=>{
      setText(message.text);
    })
  })

  const updateMessage = ()=>{
    fetch(`${ENDPOINTS[1]}/message.txt`)
    .then((response)=>{
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => {
      setText(json.data);
    })
    .catch((err)=>{
      console.log(err.message);
    })  
  }

  const chatRoomJoin = ()=>{
    let date = Date.now();
    localStorage.setItem('id',12345);
    socket.emit('join chat',12345);
    console.log('Chat Room Joined');
    setJoinChat(true);
    setStatus(true);
  }

  const triggerSocket = ()=>{
    updateMessage();
    socket.emit("button-clicked");
  }

  const sendMessage = ()=>{
    setStatus(true);
    let message = {
      id: 12345,
      text: text
    }
    socket.emit("new-message",message);
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

  return (
    <div className="App container my-2">
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

    {joinChat && 
      <>
          <div className="mb-3">
          <label htmlFor="" className="form-label"></label>
          <textarea className="form-control"  name="" id="" rows="20" value={text} onChange={changeText}></textarea>
        </div>
        <button type="button" onClick={sendMessage} className="btn btn-primary" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
          Send
        </button>
      </>
    }    
    

    </div>
  );
}

export default App;
