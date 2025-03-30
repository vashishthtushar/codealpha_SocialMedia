import React, { useEffect, useState } from 'react'
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ProfileCard = ({ location }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    const [serverPublic, setServerPublic] = useState(process.env.REACT_APP_PUBLIC_FOLDER);
    const navigate = useNavigate();

    useEffect(() => {
        if (!serverPublic) {
            setServerPublic("http://localhost:4000/images/");
        }
    }, [serverPublic]);

    const handleProfileClick = () => {
        navigate(`/profile/${user._id}`);
    };

    return (
        <div className='ProfileCard'>
            <div className="ProfileImages">
                <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
                <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
            </div>

            <div className="ProfileName">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.worksAt ? user.worksAt : "write about yourself..."}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Following</span>
                    </div>

                    {location === "profilePage" && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts.filter((post) => post.userId === user._id).length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>

            {location === "profilePage" ? '' :
                <span className="profile-link" onClick={handleProfileClick}>
                    My Profile
                </span>
            }
        </div>
    )
}

export default ProfileCard
