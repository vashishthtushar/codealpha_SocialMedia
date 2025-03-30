import React, { useEffect } from 'react';
import './Profile.css';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import PostSide from '../../Components/PostSide/PostSide';
import RightSide from '../../Components/RightSide/RightSide';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    // If the profile ID doesn't exist or is invalid, redirect to home
    if (!params.id) {
      navigate('/home');
    }
  }, [params.id, navigate]);

  return (
    <div className='Profile'>
      <ProfilePageLeft />

      <div className="ProfilePage-Center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>

      <RightSide />
    </div>
  );
};

export default Profile;
