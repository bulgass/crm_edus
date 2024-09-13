import React, { useState } from 'react';
import './menubar.css';
import { useAuth } from '../../../providers/authProvider/authProvider';
import { useNavigate } from 'react-router';

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? '❮' : '❯'}
      </button>
      <ul className="sidebar-list">
        <li className="sidebar-item" onClick={handleProfileClick}>
          <span className="sidebar-icon">📊</span>
          {isOpen && 'Dashboard'}
        </li>
        <li className="sidebar-item" onClick={handleInboxClick}>
          <span className="sidebar-icon">📥</span>
          {isOpen && 'Inbox'}
        </li>
        <li className="sidebar-item" onClick={handleProfileClick}>
          <span className="sidebar-icon">👤</span>
          {isOpen && 'Profile'}
        </li>
        <li className="sidebar-item">
          <span className="sidebar-icon">⚙️</span>
          {isOpen && 'Settings'}
        </li>
        {userRole === 'admin' && (
          <li className="sidebar-item" onClick={handleUsersClick}>
            <span className="sidebar-icon">👥</span>
            {isOpen && 'Users'}
          </li>
        )}
        <li className="sidebar-item" onClick={handleLogout}>
          <span className="sidebar-icon">🔒</span>
          {isOpen && 'Log Out'}
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
