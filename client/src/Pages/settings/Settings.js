import React, { useState } from 'react';
import './Settings.css';
import LogoSearch from '../../Components/LogoSearch/LogoSearch';
import RightSide from '../../Components/RightSide/RightSide';
import { useSelector } from 'react-redux';
import ProfileModal from '../../Components/ProfileModal/ProfileModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import FollowersCard from '../../Components/FollowersCard/FollowersCard';

const Settings = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="Settings">
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

      <div className="SettingsCenter">
        <div className="settings-header">
          <Link to="/home" className="back-button">
            <ArrowBackIcon />
            <span>Back to Home</span>
          </Link>
          <h2>Settings</h2>
        </div>

        <div className="settingsContent">
          <div className="settingsBox">
            <h3>Edit Profile</h3>
            <p>Update your profile information</p>
            <button className="button fc-button" onClick={() => setModalOpened(true)}>
              Edit Profile
            </button>
          </div>

          <div className="settingsBox">
            <h3>Account Settings</h3>
            <p>Manage your account settings</p>
            <button className="button fc-button">
              Account Settings
            </button>
          </div>

          <div className="settingsBox">
            <h3>Notification Settings</h3>
            <p>Customize your notification preferences</p>
            <button className="button fc-button">
              Notification Settings
            </button>
          </div>

          <div className="settingsBox">
            <h3>Privacy Settings</h3>
            <p>Manage your privacy settings</p>
            <button className="button fc-button">
              Privacy Settings
            </button>
          </div>
        </div>
      </div>

      <RightSide />
      <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
    </div>
  );
};

export default Settings; 