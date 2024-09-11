import React from 'react';
import Home from './homepageComponent';
import { MenuBar } from '../../submodules/menuBar/menubar';
const HomePage = () => {
  return (
    <div>
      <MenuBar/>
      <Home/>
    </div>
  );
};

export default HomePage;
