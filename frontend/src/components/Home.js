import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import ChatList from './Chatlist';
import ChatMessages from './ChatMessages';

const ENDPOINTS = ["http://localhost:5000", "http://192.168.1.9:5000"];

const App = () => {
  const [showChatList, setShowChatList] = useState(true);
  var socket = io(ENDPOINTS[0]);
  const [text, setText] = useState("");
  let [status, setStatus] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [userId, setUserId] = useState(null);

  const groupClick = (id) => {
    setUserId(null);
    setGroupId(id);
    if (window.innerWidth < 768) {
      setShowChatList(false);
    }
  };

  const userClick = (id) => {
    setGroupId(null);
    setUserId(id);
    if (window.innerWidth < 768) {
      setShowChatList(false);
    }
  };

  // Function to handle going back to chat list
  const handleBackToList = () => {
    setShowChatList(true);
  };

  useEffect(() => {
    socket.emit('setup', 'hello');
    setStatus(false);
  }, [status]);

  const getInitials = (name) => {
    const nameArr = name.split(' ');
    return nameArr[0][0].toUpperCase();
  };

  useEffect(() => {
    socket.on('message-received', (message) => {
      setText(message.text);
    });
    if (!localStorage.getItem('token')) {
      window.location.reload();
    }
  });

  return (
    <Container fluid className="vh-100 p-0">
     <style>
      {`
      /* Add to your CSS file */
.vh-100 {
  height: 100vh;
  max-height: 100vh;
}

/* For mobile devices */
@media (max-width: 767.98px) {
  .vh-100 {
    height: calc(100vh - 60px);
  }
}

/* Chat input styling */
.chat-input-container {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}

.chat-input-form {
  display: flex;
  gap: 0.5rem;
}

.chat-input {
  flex-grow: 1;
  border: 1px solid #dee2e6;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  resize: none;
  min-height: 40px;
  max-height: 100px;
}

.chat-send-button {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Messages container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* Adjust content height to account for input */
.chat-content {
  height: calc(100% - 60px);
  overflow-y: auto;
}
  `}
     </style>
           {/* Mobile Toggle Button */}
      <Row className="d-md-none m-0 p-2 bg-light border-bottom">
        <Col>
          <Button
            variant="primary"
            className="w-100 py-2"
            onClick={() => setShowChatList(!showChatList)}
          >
            <i className={`fa ${showChatList ? 'fa-comment' : 'fa-list'} me-2`}></i>
            {showChatList ? 'Show Messages' : 'Show Chat List'}
          </Button>
        </Col>
      </Row>

      <Row className="m-0 h-100">
        {/* Chat List - Left Panel */}
        <Col
          md={4}
          lg={3}
          className={`p-0 ${!showChatList && 'd-none'} d-md-block h-100 border-end`}
          style={{ overflowY: 'auto' }}
        >
          <ChatList
            groupClick={groupClick}
            userClick={userClick}
            groupId={groupId}
            setGroupId={setGroupId}
            userId={userId}
            setUserId={setUserId}
            getInitials={getInitials}
            socket={socket}
          />
        </Col>

        {/* Chat Messages - Right Panel */}
        <Col
          md={8}
          lg={9}
          className={`p-0 ${showChatList && 'd-none'} d-md-block h-100`}
          style={{ overflowY: 'auto' }}
        >
          <div className="d-flex flex-column h-100">
            {/* Back button for mobile */}
            <div className="d-md-none p-2 bg-light border-bottom">
              <Button 
                variant="outline-primary" 
                className="btn px-3 d-flex align-items-center" 
                onClick={handleBackToList}
              >
                <i className="fa fa-chevron-left me-2"></i>
                <span>Back to Chats</span>
              </Button>
            </div>

            {(groupId || userId) ? (
              <ChatMessages
                groupId={groupId}
                setGroupId={setGroupId}
                userId={userId}
                setUserId={setUserId}
                getInitials={getInitials}
                socket={socket}
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                <div className="text-center">
                  <i className="fa fa-comments fa-3x mb-3"></i>
                  <p>Select a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;