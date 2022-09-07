import './Chat.css'
import { Avatar, IconButton } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import SendIcon from '@mui/icons-material/Send';
import ChatOffCanvas from './ChatOffCanvas';
import { useState, useRef } from 'react';


const Chat = ({contact, messages, handleSendMessage}) => {
  const userId = localStorage.getItem('user')
  const [message, setMessage] = useState('');
  const endOfMessageRef = useRef(null);
  const scrollToBottom =() => {
    endOfMessageRef.current.scrollIntoView({behavior : 'smooth', block : 'start'})
  }
  const sendMessage = (e) => {
    e.preventDefault();
    const date = new Date()
    const id = (Math.random() + 1).toString(36).substring(7);
    const data = {
      sender : userId,
      time : (date.toLocaleString([], {timeStyle: 'short'})).toLocaleLowerCase(),
      message : message,
      id : id
    }
    handleSendMessage(data)
    setMessage('')
    scrollToBottom()
  }
  const [offCanvasIsOpen, setOffCanvasIsOpen] = useState('')
  const OpenOffCanvas = (status) => {
      setOffCanvasIsOpen(status)
  }
  return (
    <div className="chat__container">
      <ChatOffCanvas isOpen={offCanvasIsOpen} handleOffCanvas={OpenOffCanvas} data={contact}/>
      <div className="chat__header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => OpenOffCanvas('chatoffcanvas__active')}>
            <Avatar src={contact && contact.contact.image} />
          </IconButton>
          <div>
            <h5>{contact && contact.name} {contact && contact.contact.verified ? <VerifiedIcon style={{width : 15, height : 15, color : 'green'}} /> : ''}</h5>
            <p>Online</p>
          </div>
        </div>
        <div>
          <IconButton>
            <VideocamOutlinedIcon />
          </IconButton>
          <IconButton>
            <CallIcon />
          </IconButton>
          <span style={{ margin: "0 15px" }}> | </span>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__main'>
        {messages && messages.map(text => (
          <div className={`chat__message ${text.sender === userId ? 'message__right' : ''}`} key={text.id}>
            {text.message}
            <p className="chat__time">{text.time}</p>
          </div> 
        ))}
        <div ref={endOfMessageRef} style={{height:20}}></div>  
      </div>
      <div className="chat__bottom">
        <div style={{display: "flex", justifyContent: "space-between", flex : 0.1}}>
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon style={{transform: 'rotate(-40deg)'}}/>
          </IconButton>
        </div>
        <form className="chat__form" onSubmit={sendMessage}>
          <input placeholder="Message Here" className="chat__input"
          value={message} onChange={e => setMessage(e.target.value)}/>
        </form>
        <div>
        {message ? (
          <IconButton onClick={sendMessage}>
              <SendIcon />
          </IconButton>
        ) : (
          <IconButton>
              <KeyboardVoiceOutlinedIcon />
          </IconButton>
        )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
