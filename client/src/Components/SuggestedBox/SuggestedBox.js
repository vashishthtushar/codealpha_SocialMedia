import React, { useEffect, useState } from 'react';
import './SuggestedBox.css';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';
import DirectLink from '../DirectLink';
import UserFollow from '../UserFollow/UserFollow';

const SuggestedBox = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const MAX_SUGGESTIONS = 3;

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { data } = await getAllUser();
        // Filter out the current user and users already being followed
        const filteredPersons = data.filter(
          person => person._id !== user._id && !user.following.includes(person._id)
        );
        // Limit to MAX_SUGGESTIONS users
        setPersons(filteredPersons.slice(0, MAX_SUGGESTIONS));
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };
    
    fetchPersons();
  }, [user._id, user.following]);

  return (
    <div className='SuggestedBox'>
      <div className="suggested-header">
        <h3>Suggested for you</h3>
        <DirectLink to="/explore" className="see-all">
          See all
        </DirectLink>
      </div>
      
      {persons.length === 0 ? (
        <div className="no-suggestions">No suggestions available</div>
      ) : (
        persons.map((person, id) => (
          <UserFollow person={person} key={id} />
        ))
      )}
    </div>
  );
};

export default SuggestedBox; 