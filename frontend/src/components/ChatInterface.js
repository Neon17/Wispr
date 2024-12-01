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

const ChatInterface = () => {
  return (
    <div className="container py-4" style={{ maxWidth: "768px" }}>
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`d-flex align-items-center mb-4 ${message.isUser ? 'flex-row-reverse' : ''}`}
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
              className={`p-3 rounded-3 bg-white shadow-sm ${
                message.isUser 
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
  );
};

export default ChatInterface;