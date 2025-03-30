import React from 'react';
import './Notifications.css';
import LogoSearch from '../../Components/LogoSearch/LogoSearch';
import FollowersCard from '../../Components/FollowersCard/FollowersCard';
import RightSide from '../../Components/RightSide/RightSide';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  
  const notifications = [
    { id: 1, type: 'like', user: 'Sarah Johnson', content: 'liked your post', time: '2 min ago' },
    { id: 2, type: 'comment', user: 'Michael Chen', content: 'commented on your post', time: '1 hour ago' },
    { id: 3, type: 'follow', user: 'Emma Wilson', content: 'started following you', time: 'Yesterday' },
    { id: 4, type: 'mention', user: 'James Miller', content: 'mentioned you in a comment', time: '2 days ago' },
    { id: 5, type: 'like', user: 'Olivia Brown', content: 'liked your photo', time: '3 days ago' },
  ];

  return (
    <div className="Notifications">
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
      
      <div className="NotificationsCenter">
        <div className="notifications-header">
          <Link to="/home" className="back-button">
            <ArrowBackIcon />
            <span>Back to Home</span>
          </Link>
          <h2>Notifications</h2>
        </div>
        
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">No notifications yet</div>
          ) : (
            notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-avatar">
                  <img src={process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="" />
                </div>
                <div className="notification-content">
                  <p>
                    <span className="user-name">{notification.user}</span> {notification.content}
                  </p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <RightSide />
    </div>
  );
};

export default Notifications; 