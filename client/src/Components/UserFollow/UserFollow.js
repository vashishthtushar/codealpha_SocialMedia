import React, { useState } from 'react';
import './UserFollow.css';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction';
import DirectLink from '../DirectLink';

const UserFollow = ({ person }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers?.includes(user._id) || false);

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleFollow = () => {
        following ? dispatch(unFollowUser(person._id, user))
            : dispatch(followUser(person._id, user));

        setFollowing((prev) => !prev);
    }

    return (
        <div className="follower">
            <DirectLink to={`/profile/${person._id}`}>
                <div>
                    <img 
                        src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"} 
                        alt="" 
                        className='followerImg' 
                    />
                    <div className="name">
                        <span>{person.firstname}</span>
                        <span>@{person.firstname}{person.lastname}</span>
                    </div>
                </div>
            </DirectLink>

            <button className='button fc-button' onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
};

export default UserFollow;
