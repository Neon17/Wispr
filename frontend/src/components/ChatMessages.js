import { useEffect,useState } from "react";
import axios from "axios";


const ChatMessages = (props) => {
  const [axiosConfig] = useState({
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  const [messages,setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(()=>{
    setMessages(null);
    if (props.groupId!=null)
      fetchMessages(props.groupId);
  },[props.groupId, props.userId])

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

  const sendGroupMessage = (id)=>{
    let temp = messageText;
    setMessageText("");
    axios.post("http://localhost:5000/api/v1/users/sendMessage",{
      "groupId": id,
      "message": temp
    }, axiosConfig).then((res)=>{
      console.log(res.data);
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
      props.setUserId(null);
      props.setGroupId(res.data.data._id);
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  const changeMessageText = (event)=>{
    setMessageText(event.target.value);
  }

  return (
    <div className='border d-flex flex-column justify-content-between' style={{ width: '65%' }}>

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
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="button"
            aria-pressed="false"
            autoComplete="off"
            onClick={() => { startChat(props.userId) }}
          >
            Start Chat
          </button>

        }

        {(!messages) && (!props.userId) && (props.groupId) &&
          <div className='text-center m-5'>Start messaging to see messages here</div>
        }

      </div>


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
          <button type="button" onClick={() => sendGroupMessage(props.groupId)} className="btn btn-primary rounded-0 rounded-end" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatMessages;