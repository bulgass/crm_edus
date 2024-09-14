import React from "react";
import { Link, Outlet } from "react-router-dom";
import MenuBar from "../../submodules/menuBar/menubar";
import "./homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <MenuBar />
      <div className="cards-container">
        <Link
          to="/folders/b1"
          target={"_blank"}
          className="card folder-card"
        >
          <h3>B1</h3>
        </Link>
        <Link to="folders/f1" target="_blank" className="card folder-card">
          <h3>F1</h3>
        </Link>
        <Link
          to="folders/clientdb"
          target="_blank"
          className="card folder-card"
        >
          <h3>ClientDB</h3>
        </Link>
        <Link
          to="folders/greencard"
          target="_blank"
          className="card folder-card"
        >
          <h3>GreenCard</h3>
        </Link>
        <Link
          to="folders/interview"
          target="_blank"
          className="card folder-card"
        >
          <h3>Interview</h3>
        </Link>
        <Link
          to="folders/workmaterials"
          target="_blank"
          className="card folder-card"
        >
          <h3>WorkMaterials</h3>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Homepage;
