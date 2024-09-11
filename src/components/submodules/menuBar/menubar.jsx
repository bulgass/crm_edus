import React from 'react';
import './menubar.css';
import { useAuth } from '../../../providers/authProvider/authProvider';
import { useNavigate } from 'react-router';

export const MenuBar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
  
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
            <li className="sidebar-item" onClick={handleProfileClick}> {/* Здесь добавляем onClick */}
              <span className="sidebar-icon">👤</span>
              Profile
            </li>
            <li className="sidebar-item">
              <span className="sidebar-icon">⚙️</span>
              Settings
            </li>
            <li className="sidebar-item" onClick={handleLogout}>
              <span className="sidebar-icon">🔒</span>
              Log Out
            </li>
          </ul>
        </div>
    );
};

export default MenuBar;
