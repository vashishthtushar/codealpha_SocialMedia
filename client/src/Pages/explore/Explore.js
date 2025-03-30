import React, { useEffect, useState } from 'react';
import './Explore.css';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import RightSide from '../../Components/RightSide/RightSide';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';
import UserFollow from '../../Components/UserFollow/UserFollow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectLink from '../../Components/DirectLink';

const Explore = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.authReducer.authData);
  
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const { data } = await getAllUser();
        // Filter out the current user
        const filteredPersons = data.filter(person => person._id !== user._id);
        setPersons(filteredPersons);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersons();
  }, [user._id]);

  return (
    <div className='Explore'>
      <ProfilePageLeft />
      
      <div className="ExploreCenter">
        <div className="explore-header">
          <DirectLink to="/home" className="back-button">
            <ArrowBackIcon />
            <span>Back</span>
          </DirectLink>
          <h2>Explore</h2>
        </div>
        
        <div className="users-container">
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : persons.length === 0 ? (
            <div className="no-users">No users found</div>
          ) : (
            persons.map((person, id) => (
              <UserFollow person={person} key={id} />
            ))
          )}
        </div>
      </div>
      
      <RightSide />
    </div>
  );
};

export default Explore; 