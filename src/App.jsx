import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './providers/authProvider/authProvider'; 
import Login from "./components/pages/auth/login/login";
import Signup from "./components/pages/auth/signup/signup";
import Home from "./components/pages/home/homepage";
import Profile from './components/pages/profile/profile';
import CheckUsers from './components/pages/checkUsers/checkUsers'; 
import "./App.css";

function App() {
  const { currentUser, userRole } = useAuth();

  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('User Role:', userRole);
  }, [currentUser, userRole]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {currentUser ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/profile" element={<Profile />} />
              {userRole === 'admin' && (
                <Route path="/check-users" element={<CheckUsers />} />
              )}
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
