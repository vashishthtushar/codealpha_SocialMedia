import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';

const Test = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log("Test navigation to:", path);
    
    // Try React Router navigation
    try {
      navigate(path);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to direct URL navigation
      window.location.href = path;
    }
  };

  return (
    <div className="test-container">
      <h1>Navigation Test Page</h1>
      <p>This page is for testing navigation between routes. Click the buttons below to test navigation.</p>
      
      <div className="test-buttons">
        <button onClick={() => handleNavigation('/home')}>Go to Home</button>
        <button onClick={() => handleNavigation('/chat')}>Go to Chat</button>
        <button onClick={() => handleNavigation('/settings')}>Go to Settings</button>
      </div>

      <div className="direct-links">
        <h2>Direct Links</h2>
        <p>Try these direct URL links if the buttons don't work:</p>
        <ul>
          <li><a href="/home">Home Page</a></li>
          <li><a href="/chat">Chat Page</a></li>
          <li><a href="/settings">Settings Page</a></li>
        </ul>
      </div>

      <div className="debug-info">
        <h2>Debug Information</h2>
        <p>Current URL: {window.location.href}</p>
        <p>URL Path: {window.location.pathname}</p>
      </div>
    </div>
  );
};

export default Test; 