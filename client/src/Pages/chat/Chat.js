import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useSelector } from 'react-redux';
import LogoSearch from '../../Components/LogoSearch/LogoSearch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RightSide from '../../Components/RightSide/RightSide';
import { Link } from 'react-router-dom';
import FollowersCard from '../../Components/FollowersCard/FollowersCard';

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [conversations] = useState([
    { id: 1, name: "Sarah Johnson", lastMessage: "How are you doing?", profilePic: user.profilePicture, time: "2 min" },
    { id: 2, name: "Michael Chen", lastMessage: "Let's meet tomorrow", profilePic: user.profilePicture, time: "1 hour" },
    { id: 3, name: "Emma Wilson", lastMessage: "Thanks for sharing!", profilePic: user.profilePicture, time: "Yesterday" },
    { id: 4, name: "James Miller", lastMessage: "That was a great post", profilePic: user.profilePicture, time: "2 days" },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: 1, text: "Hey there! How's it going?", time: "10:30 AM" },
    { id: 2, sender: "me", text: "I'm good, thanks! How about you?", time: "10:32 AM" },
    { id: 3, sender: 1, text: "I'm doing great! Just finished my project.", time: "10:33 AM" },
    { id: 4, sender: "me", text: "That's awesome! Would love to see it.", time: "10:35 AM" },
    { id: 5, sender: 1, text: "Sure, I'll send you the details soon.", time: "10:36 AM" },
  ]);

  useEffect(() => {
    // When a chat is selected, automatically scroll to the bottom of the messages
    if (selectedChat) {
      const chatMessages = document.querySelector(".chat-messages");
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  }, [selectedChat, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  return (
    <div className="Chat">
      <div className="left-side">
        <LogoSearch />
        <div className="profile-card">
          <div className="profile-image">
            <img 
              src={user.profilePicture 
                ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture 
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} 
              alt="Profile" 
            />
          </div>
          <div className="profile-name">
            <span>{user.firstname} {user.lastname}</span>
          </div>
          <div className="profile-stats">
            <div>
              <span>{user.following ? user.following.length : 0}</span>
              <span>Following</span>
            </div>
            <div>
              <span>{user.followers ? user.followers.length : 0}</span>
              <span>Followers</span>
            </div>
          </div>
        </div>
        <FollowersCard />
      </div>
      
      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="chat-header">
            <Link to="/home" className="back-button">
              <ArrowBackIcon />
              <span>Back to Home</span>
            </Link>
            <h2>Conversations</h2>
          </div>
          <div className="conversation-list">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`conversation-item ${selectedChat === conversation.id ? 'active' : ''}`}
                onClick={() => handleChatSelect(conversation.id)}
              >
                <div className="conversation-avatar">
                  <img 
                    src={process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} 
                    alt={conversation.name} 
                  />
                </div>
                <div className="conversation-info">
                  <h3>{conversation.name}</h3>
                  <p>{conversation.lastMessage}</p>
                </div>
                <div className="conversation-time">
                  <span>{conversation.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chat-main">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <img 
                    src={process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} 
                    alt="" 
                  />
                  <h3>{conversations.find(c => c.id === selectedChat)?.name}</h3>
                </div>
              </div>
              
              <div className="chat-messages">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`message ${msg.sender === "me" ? "sent" : "received"}`}
                  >
                    <div className="message-content">
                      <p>{msg.text}</p>
                      <span className="message-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <form className="chat-input" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="send-button">Send</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
      
      <RightSide />
    </div>
  );
};

export default Chat; 