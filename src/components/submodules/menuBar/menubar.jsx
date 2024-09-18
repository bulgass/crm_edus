import React, { useState } from 'react';
import './menubar.css';
import { useAuth } from '../../../providers/authProvider/authProvider';
import { useNavigate } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

export const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { logout, userRole } = useAuth(); 

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error.message);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleUsersClick = () => {
    navigate('/check-users'); 
  };

  const handleInboxClick = () =>{
    navigate('/inbox');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard'); 
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? '❮' : '❯'}
      </button>
      <ul className="sidebar-list">
        {userRole === 'admin' && (
          <li className="sidebar-item" onClick={handleDashboardClick}>
            <DashboardIcon className="sidebar-icon" />
            {isOpen && 'Dashboard'}
          </li>
        )}
        <li className="sidebar-item" onClick={handleInboxClick}>
          <InboxIcon className="sidebar-icon" />
          {isOpen && 'Inbox'}
        </li>
        <li className="sidebar-item" onClick={handleProfileClick}>
          <PersonIcon className="sidebar-icon" />
          {isOpen && 'Profile'}
        </li>
        <li className="sidebar-item" onClick={handleSettingsClick}>
          <SettingsIcon className="sidebar-icon" />
          {isOpen && 'Settings'}
        </li>
        {userRole === 'admin' && (
          <li className="sidebar-item" onClick={handleUsersClick}>
            <GroupIcon className="sidebar-icon" />
            {isOpen && 'Users'}
          </li>
        )}
        <li className="sidebar-item" onClick={handleLogout}>
          <LogoutIcon className="sidebar-icon" />
          {isOpen && 'Log Out'}
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
