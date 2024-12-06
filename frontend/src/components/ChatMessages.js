import { useEffect,useState } from "react";
import axios from "axios";
import { Form, InputGroup, Button, } from 'react-bootstrap';

const ChatMessages = (props) => {
  const [axiosConfig] = useState({
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  const [messages,setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState(false); //status when messages need to be updated

  useEffect(()=>{
    setMessages(null);
    if (props.groupId!=null)
      fetchMessages();
    setStatus(false);
  },[props.groupId, props.userId,status])

  useEffect(()=>{
    props.socket.on('send-message-status',(res)=>{
      // console.log(res);
      if (res.status=='success') console.log('successfully sent message');
      else console.log('failed to send message');
    })
    props.socket.on('new-message-received',()=>{
      setStatus(true);
    });
  })

  const fetchMessages = ()=>{
    let id = props.groupId;
    axios.post("http://localhost:5000/api/v1/users/getAllMessages",{
      "groupId": id
    }, axiosConfig).then((res)=>{
      // console.log(res.data);
      setMessages(res.data.data);
    }).catch((err)=>{
      console.error(err.message);
    })
  }

  const sendGroupMessage = (id)=>{
    let temp = messageText;
    setMessageText("");
    let message = {
      "token": localStorage.getItem('token'),
      "groupId": id,
      "message": temp
    }
    props.socket.emit('group-message-send',message);
  }

  const startChat = (id)=>{
    //It create group with that User (like making friends on Facebook)
    axios.post("http://localhost:5000/api/v1/users/addGroup",{
      "id": id,
    }, axiosConfig).then((res)=>{
      // console.log(res.data);
      props.setUserId(null);
      props.setGroupId(res.data.data._id);
    }).catch((err)=>{
      console.error(err.message);
    })
  }

  const changeMessageText = (event)=>{
    setMessageText(event.target.value);
  }

  return (
    <>
    <div className='border m-5 d-flex flex-column justify-content-between' style={{ width: '65%' }}>
    
      {(!props.groupId) && (!props.userId) && <div className='text-center m-5'>Click on the Group or User List to see messages</div>}
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
                {message.senderId.firstName[0]}
              </div>
              <span
                className="position-absolute bottom-0 end-0 rounded-circle bg-success"
                style={{ width: "12px", height: "12px", border: "2px solid #fff" }}
              ></span>
            </div>

            <div className={`my-1 ${message.isUser ? 'me-2' : 'ms-2'}`} style={{ maxWidth: "75%" }}>
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

        {(!messages) && (!props.groupId) && (props.userId) &&
          // <button
          //   type="button"
          //   className="btn btn-primary"
          //   data-bs-toggle="button"
          //   aria-pressed="false"
          //   autoComplete="off"
          //   onClick={() => { startChat(props.userId) }}
          // >
          //   Start Chat
          // </button>
          startChat(props.userId)

        }

        {(!messages) && (!props.userId) && (props.groupId) &&
          <div className='text-center m-5'>Start messaging to see messages here</div>
        }

      </div>

      {(props.groupId) &&
      <div className=' p-2 w-100 d-flex'>
        <div className="mb-3 flex-grow-1">
        <InputGroup
      type="text"
      name=""
      id=""
      style={{
        backgroundColor: '#FFF',
        borderRadius: '30px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '5px 12px',
      }}
      value={messageText}
      onChange={changeMessageText}
      placeholder="Type a message"
      aria-describedby="helpId"
    >
  <Form.Control
    placeholder="Type a message"
    className="border-0 p-3"
    style={{
      borderRadius: '25px',
      fontSize: '16px',
      backgroundColor: '#F6F6F6',
      transition: 'all 0.3s ease',
    }}
  />
  <Button
    type="button"
    onClick={() => sendGroupMessage(props.groupId)}
    className="btn btn-primary ms-2 rounded-circle d-flex justify-content-center align-items-center"
    style={{
      width: '45px',
      height: '45px',
      backgroundColor: '#007bff',
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    }}
    aria-pressed="false"
    autoComplete="off"
    variant="outline-secondary"
  >
    <i className="fa-solid fa-arrow-right" style={{ fontSize: '18px', color: 'white' }}></i>
  </Button>
</InputGroup>
        </div>
 
      </div>}

    </div>
    </>
  );
};

export default ChatMessages;