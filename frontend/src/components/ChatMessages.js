import { useEffect,useState } from "react";
import axios from "axios";
import { Form, InputGroup, Button,Container, Row, Col } from 'react-bootstrap';
import PageLoader from './../components/Loader/PageLoader';

const ChatMessages = (props) => {
  const [axiosConfig] = useState({
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  const [messages,setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState(false); //status when messages need to be updated
  const [scrollStatus, setScrollStatus] = useState(0); //scroll to bottom at first
 
  useEffect(()=>{
    if (props.groupId!=null )
      fetchMessages();
    setStatus(false);
  },[props.groupId, props.userId,status])
  

  useEffect(()=>{
    props.socket.on('send-message-status',(res)=>{
      // console.log(res);
      if (res.status=='success') console.log('successfully sent message');
      else console.log('failed to send message');
    })
    props.socket.on('new-message-received',(message)=>{
        if ((message!=undefined)||(message!=null)){
          if (message.groupId==props.groupId){
            console.log("In same room from ChatMessages");
            if (!status){
              setStatus(true);
            setScrollStatus(0);
            }
          }
        }
    });
    if (scrollStatus<=15){
      if ((props.groupId)){
        let msg = document.getElementById("messages-box-scroll-1234");
        msg.scrollTop = msg.scrollHeight;
        setScrollStatus(scrollStatus+1);
      }
    }
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
    console.log("Group Message Clicked");
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
    {/* header */}
    <div className="bg-white border-b p-3">
      <Container fluid>
        <Row className="align-items-center">
          <Col className="d-flex align-items-center">
            <div className="position-relative me-3">
              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="fas fa-comment-dots text-white"></i>
              </div>
              <div className="position-absolute bottom-0 end-0">
                <i className="fas fa-circle text-success" style={{ fontSize: '12px' }}></i>
              </div>
            </div>
            <div>
              <h6 className="mb-0">Chat Room</h6>
              <small className="text-muted">Online</small>
            </div>
          </Col>
          <Col xs="auto">
            <Button variant="light" className="rounded-circle p-2">
              <i className="fas fa-ellipsis-h"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
      {(!props.groupId) && (!props.userId) && (
  <div className='empty-state text-center'>
    <i className="fas fa-comments fa-3x mb-3 text-primary-subtle"></i>
    <div className='text-secondary fw-light'>Click on the Group or User List to see messages</div>
  </div>
)}

<div className='messages-container px-lg-4 px-2 py-3' id="messages-box-scroll-1234">
  {messages && messages.map(message => (
    <div
      key={message._id}
      className={`message-wrapper d-flex align-items-end ${message.isUser ? 'flex-row-reverse' : ''} mb-4`}
    >
      <div className="position-relative mx-2">
        <div
          className="avatar-circle"
        >
          {message.senderId.firstName[0]}
        </div>
        <span className="online-indicator"></span>
      </div>

      <div className="message-content-wrapper" style={{ maxWidth: "65%" }}>
        <div
          className={`message-bubble ${message.isUser ? 'message-sent' : 'message-received'}`}
        >
          <p className="message-text">{message.message}</p>
          <div className={`message-meta ${message.isUser ? 'justify-content-end' : ''}`}>
            <span className="message-time">{message.dateTime}</span>
            {message.isUser && (
              <i className="fas fa-check-double message-status"></i>
            )}
          </div>
        </div>
        
        {!message.isUser && (
          <div className="sender-name">
            {message.senderId.firstName}
          </div>
        )}
      </div>
    </div>
  ))}

  {(!messages) && (!props.groupId) && (props.userId) && startChat(props.userId)}

  {(!messages) && (!props.userId) && (props.groupId) && (
    <div className='empty-state text-center'>
      <i className="fas fa-paper-plane fa-2x mb-3 text-primary-subtle"></i>
      <div className='text-secondary fw-light'>Start messaging to see messages here</div>
    </div>
  )}
</div>

<style>
{`
  .messages-container {
    height: calc(100vh - 140px);
    overflow-y: auto;
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);
    scrollbar-width: thin;
    scrollbar-color: #dee2e6 transparent;
  }

  .empty-state {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: #6c757d;
  }

  .message-wrapper {
    animation: slideIn 0.3s ease-out;
    margin-bottom: 1.5rem;
  }

  .avatar-circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
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
    transform: scale(1.1);
  }

  .online-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: #198754;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  .message-bubble {
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    position: relative;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  .message-bubble:hover {
    transform: translateY(-1px);
  }

  .message-sent {
    background: linear-gradient(135deg, #0d6efd, #0d6efd);
    color: white;
    border-bottom-right-radius: 0.25rem;
  }

  .message-received {
    background: white;
    color: #212529;
    border-bottom-left-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .message-text {
    margin-bottom: 0.3rem;
    font-size: 0.95rem;
    line-height: 1.4;
    white-space: pre-line;
    word-break: break-word;
  }

  .message-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.8;
  }

  .message-time {
    font-size: 0.7rem;
    color: inherit;
    opacity: 0.8;
  }

  .message-status {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .sender-name {
    margin-top: 0.3rem;
    margin-left: 0.5rem;
    font-size: 0.75rem;
    color: #6c757d;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Scrollbar Styling */
  .messages-container::-webkit-scrollbar {
    width: 6px;
  }

  .messages-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .messages-container::-webkit-scrollbar-thumb {
    background-color: #dee2e6;
    border-radius: 20px;
  }

  .messages-container::-webkit-scrollbar-thumb:hover {
    background-color: #adb5bd;
  }

  /* Empty State Animation */
  .empty-state i {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`}
</style>

      {(props.groupId) &&
<div className="p-3 border-top bg-white">
<InputGroup>
      <div className="d-flex gap-2 me-2">
              <Button variant="light" className="rounded-circle p-2">
                <i  className="fas fa-paperclip text-primary"></i>
              </Button>
              <Button variant="light" className="rounded-circle p-2">
                <i className="fas fa-image text-primary"></i>
              </Button>
              <Button variant="light" className="rounded-circle p-2">
                <i className="fas fa-smile text-primary"></i>
              </Button>
            </div>
  <Form.Control
    type="text"
    value={messageText}
    onChange={changeMessageText}
    placeholder="Type a message"
    className="rounded-pill"
  />
  <Button 
    variant="primary" 
    onClick={() => sendGroupMessage(props.groupId)}
    className="rounded-circle ms-2 d-flex align-items-center justify-content-center"
    style={{ width: '40px', height: '40px', padding: '0' }}
  >
   <i className="fas fa-paper-plane text-light"></i>
  </Button>
</InputGroup>
</div>
}

    </div>
    </>
  );
};

export default ChatMessages;