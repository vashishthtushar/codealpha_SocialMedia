import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Auth from './Pages/auth/Auth';
import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import Chat from './Pages/chat/Chat';
import Settings from './Pages/settings/Settings';
import Explore from './Pages/explore/Explore';
import Notifications from './Pages/notifications/Notifications';
import Test from './Pages/test/Test';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>


      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={user ? <Navigate to="/home" /> : <Auth />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/auth" />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/auth" />} />
        <Route path="/explore" element={user ? <Explore /> : <Navigate to="/auth" />} />
        <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/auth" />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </div>
  );
}

export default App;
