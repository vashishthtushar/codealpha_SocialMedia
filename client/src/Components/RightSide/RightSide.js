import React, { useState } from 'react';
import './RightSide.css';
import Home from '../../Img/home.png';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Noti from '../../Img/noti.png';
import Comment from '../../Img/comment.png';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className='RightSide'>
            <div className="navIcons">
                <Link to="/home" className="navIcon">
                    <img src={Home} alt="Home" />
                </Link>

                <Link to="/settings" className="navIcon">
                    <SettingsOutlinedIcon style={{width: '1.5rem', height: '1.5rem'}} />
                </Link>

                <Link to="/notifications" className="navIcon">
                    <img src={Noti} alt="Notifications" />
                </Link>
                
                <Link to="/chat" className="navIcon">
                    <img src={Comment} alt="Chat" />
                </Link>
            </div>

            <TrendCard />

            <div className="button rg-button" onClick={() => setModalOpened(true)}>
                Share
            </div>
            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>
    );
};

export default RightSide;
