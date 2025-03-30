import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavButton.css';

const NavButton = ({ icon, alt, path }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log("Navigating to:", path);
    navigate(path);
  };
  
  return (
    <div className="nav-button" onClick={handleClick}>
      {React.isValidElement(icon) ? 
        icon : 
        <img src={icon} alt={alt || "Navigation"} />
      }
    </div>
  );
};

export default NavButton; 