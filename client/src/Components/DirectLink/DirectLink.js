import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DirectLink.css';

const DirectLink = ({ to, children, className, ...props }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.stopPropagation(); // Don't preventDefault, just stop propagation
    navigate(to);
  };

  return (
    <div 
      className={`direct-link ${className || ''}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default DirectLink; 