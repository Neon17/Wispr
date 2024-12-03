import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const ENDPOINTS = ["http://localhost:5000",
  "http://192.168.1.9:5000"
];


function App() {
  var socket = io(ENDPOINTS[1]);
  const [text, setText] = useState("");
  let [status, setStatus] = useState(false);
  let [joinChat, setJoinChat] = useState(false);

  const changeText = (event) => {
    setText(event.target.value);
  }

  useEffect(() => {
    updateMessage();
    socket.emit('setup', 'hello');
    socket.on('message-received', updateMessage);
    setStatus(false);
  }, [status])

  useEffect(() => {
    socket.on('message-received', (message) => {
      setText(message.text);
    })
  })

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

  const clickGroup = () => {
    console.log('Chat Group Clicked!');
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


  const messages = [
    {
      id: 1,
      sender: "Russell",
      content: "Hello, I'm Russell.\nHow can I help you today?",
      time: "08:55",
      isUser: false,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      sender: "Sam",
      content: "Hi, Russell\nI need more information about Developer Plan.",
      time: "08:56",
      isUser: true,
      avatar: "/api/placeholder/40/40"
    }
  ];
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
    <div className="App container-fluid py-2">

      <div className='messageGroup d-flex bg-light' style={{ height: '90vh' }}>

        <div className='border' style={{ width: '35%' }}>

          <div className='searchBoxContainer p-2 px-3 d-flex'>
              <input type="text" name="" id="" className="form-control rounded-0 rounded-start-2" placeholder="Search for User" aria-describedby="helpId"/>
            <button type="button" className="btn btn-primary rounded-0 rounded-end-2" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            
          </div>
          

          <div className="personContainer border-bottom p-3" onClick={clickGroup} role="button">
            {/* Profile Name */}
            <div className="d-flex align-items-center">
              {/* Avatar with initials */}
              <div
                className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{ width: '50px', height: '50px', fontSize: '18px' }}
              >
                {getInitials('Shyam Bahadur')}
              </div>

              {/* Name and message */}
              <div className="ms-3">
                {/* Person Name */}
                <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                  Shyam Bahadur
                </div>
                {/* Last Message */}
                <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                  Are you coming home?
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="personTime form-text text-muted text-end" style={{ fontSize: '12px' }}>
              07:08 AM
            </div>
          </div>
          <div className="personContainer border-bottom p-3" onClick={clickGroup} role="button">
            {/* Profile Name */}
            <div className="d-flex align-items-center">
              {/* Avatar with initials */}
              <div
                className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{ width: '50px', height: '50px', fontSize: '18px' }}
              >
                {getInitials('Neon Neupane')}
              </div>

              {/* Name and message */}
              <div className="ms-3">
                {/* Person Name */}
                <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                  Neon Neupane
                </div>
                {/* Last Message */}
                <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                  Are you coming home?
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="personTime form-text text-muted text-end" style={{ fontSize: '12px' }}>
              07:08 AM
            </div>
          </div>
          <div className="personContainer border-bottom p-3" onClick={clickGroup} role="button">
            {/* Profile Name */}
            <div className="d-flex align-items-center">
              {/* Avatar with initials */}
              <div
                className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{ width: '50px', height: '50px', fontSize: '18px' }}
              >
                {getInitials('Kushal1o1')}
              </div>

              {/* Name and message */}
              <div className="ms-3">
                {/* Person Name */}
                <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                  Kushal1o1
                </div>
                {/* Last Message */}
                <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                  Are you coming home?
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="personTime form-text text-muted text-end" style={{ fontSize: '12px' }}>
              07:08 AM
            </div>
          </div>

        </div>


        <div className='border d-flex flex-column justify-content-between' style={{ width: '65%' }}>

          <div className='container-fluid'>

            {messages.map(message => (
              <div
                key={message.id}
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
                    <p className="mb-2 text-break" style={{ fontSize: "0.9rem" }}>{message.content}</p>
                    <div className={`d-flex align-items-center gap-2 ${message.isUser ? 'justify-content-end' : ''}`}>
                      <small className="text-muted" style={{ fontSize: "0.75rem" }}>{message.time}</small>
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
                      <small className="text-muted fw-medium">{message.sender}</small>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
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
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div className='buttonContainer'>
              <button type="button" className="btn btn-primary rounded-0 rounded-end" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
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
