import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';

function App() {
  const ENDPOINT = "http://localhost:5000";
  const socket = io(ENDPOINT);
  const [text,setText] = useState("");

  const changeText = (event)=>{
    setText(event.target.value);
  }

  useEffect(()=>{
    socket.emit('setup','hello');  
    socket.on('message-received',updateMessage); 
  })


  const updateMessage = ()=>{
    fetch('http://localhost:5000/message.txt')
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

  const triggerSocket = ()=>{
    socket.emit("button-clicked");
  }

  const sendMessage = ()=>{
    socket.emit("message-received",text);
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
    <div className="App">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="button"
        aria-pressed="false"
        autoComplete="off"
        onClick={triggerSocket}
      >
        Trigger Socket
      </button>
      
    <div className="mb-3">
      <label htmlFor="" className="form-label"></label>
      <textarea className="form-control"  name="" id="" rows="20" value={text} onChange={changeText}></textarea>
    </div>
    <button type="button" onClick={sendMessage} className="btn btn-primary" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
      Send
    </button>
    
    

    </div>
  );
}

export default App;
