import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MenuBar from '../../submodules/menuBar/menubar';
import './homepage.css'; 

const Homepage = () => {
  return (
    <div className="homepage">
      <MenuBar />
      <div className="cards-container">
          <Link to="folders/b1" className="card folder-card">
            <h3>B1</h3>
          </Link>
          <Link to="folders/f1" className='card folder-card'>
            <h3>F1</h3>
          </Link>
          <Link to="folders/clientdb" className='card folder-card'>
            <h3>ClientDB</h3>
          </Link>
          <Link to="folders/greencard" className='card folder-card'>
            <h3>GreenCard</h3>
          </Link>
          <Link to="folders/interview" className='card folder-card'>
            <h3>Interview</h3>
          </Link>
          <Link to="folders/workmaterials" className='card folder-card'>
            <h3>WorkMaterials</h3>
          </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Homepage;
