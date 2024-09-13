import React from 'react';
import { MenuBar } from '../../submodules/menuBar/menubar';
import './homepage.css'

const Home = () => {
  return (
    <div className="homepageComponent">
      <MenuBar/>
      <div className='header_home'>
        Hello wolrd
      </div>
    </div>
  );
};

export default Home;
