import React from 'react';
import './menubar.css';
import { useAuth } from '../../../providers/authProvider/authProvider';
import { useNavigate } from 'react-router';

export const MenuBar = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth(); // Обновите useAuth, чтобы получать currentUser

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
    navigate('/checkUsers'); 
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Sidebar</h2>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <span className="sidebar-icon">📊</span>
          Dashboard
        </li>
        <li className="sidebar-item">
          <span className="sidebar-icon">📥</span>
          Inbox
        </li>
        <li className="sidebar-item" onClick={handleProfileClick}>
          <span className="sidebar-icon">👤</span>
          Profile
        </li>
        <li className="sidebar-item">
          <span className="sidebar-icon">⚙️</span>
          Settings
        </li>
        {currentUser && currentUser.role === 'admin' && (
          <li className="sidebar-item" onClick={handleUsersClick}>
            <span className="sidebar-icon">👥</span>
            Users
          </li>
        )}
        <li className="sidebar-item" onClick={handleLogout}>
          <span className="sidebar-icon">🔒</span>
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
