import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MenuBar from '../../submodules/menuBar/menubar';
import './homepage.css'; 

const Homepage = () => {
  return (
    <div className="homepage">
      <MenuBar />
      <div className="cards-container">
        <div className="card folder-card">
          <Link to="folders/b1">
            <h3>B1</h3>
          </Link>
        </div>
        <div className="card folder-card">
          <Link to="folders/f1">
            <h3>F1</h3>
          </Link>
        </div>
        <div className="card folder-card">
          <Link to="folders/clientdb">
            <h3>ClientDB</h3>
          </Link>
        </div>
        <div className="card folder-card">
          <Link to="folders/greencard">
            <h3>GreenCard</h3>
          </Link>
        </div>
        <div className="card folder-card">
          <Link to="folders/interview">
            <h3>Interview</h3>
          </Link>
        </div>
        <div className="card folder-card">
          <Link to="folders/workmaterials">
            <h3>WorkMaterials</h3>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Homepage;
