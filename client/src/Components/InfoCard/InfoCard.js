import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import EditIcon from '@mui/icons-material/Edit';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.authReducer.authData);
  // Use user._id as fallback if profileUserId from params is undefined
  const profileUserId = params.id || user?._id;

  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    const fetchProfileUser = async () => {
      // If there's no user ID at all, skip the API call
      if (!profileUserId) {
        console.log("No profile user ID available");
        setProfileUser(user); // Use the logged-in user as fallback
        return;
      }

      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        try {
          const { data } = await UserApi.getUser(profileUserId);
          setProfileUser(data);
        } catch (error) {
          console.error("Error fetching profile user:", error);
          // Use current user as fallback if profile user fetch fails
          setProfileUser(user);
        }
      }
    };

    fetchProfileUser();
  }, [user, profileUserId, navigate]);

  const handleLogOut = () => {
    dispatch(logOut());
  }

  return (
    <div className='InfoCard'>
      <div className="infoHead">
        <h4>Profile Info</h4>

        {user._id === profileUserId ? (
          <div>
            <EditIcon 
              style={{width: '2rem', height: '1.2rem', cursor: 'pointer'}}
              onClick={() => setModalOpened(true)} 
            />
            <ProfileModal 
              modalOpened={modalOpened} 
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : ""}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser?.relationship || "Not specified"}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser?.livesin || "Not specified"}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser?.worksAt || "Not specified"}</span>
      </div>

      <button className='button logout-button' onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default InfoCard
